from flask_restful import Resource, reqparse
from flask import jsonify
import openai
import json
import re
from db import get_db_connection

class answerVerificationApi(Resource):
    def post(self):
        
        # Load OpenAI API key from JSON file
        with open('apikey.json', 'r') as file:
            json_data = file.read()
        parsed_data = json.loads(json_data)
        openai.api_key = parsed_data['api_key']

        connection = get_db_connection()

        parser = reqparse.RequestParser()
        parser.add_argument('answer', type=str, required=True, help="Answer is required")
        parser.add_argument('correct_answer', type=str, required=True, help="Correct Answer is required")
        parser.add_argument('question', type=str, required=True, help="Question is required")
        parser.add_argument('email', type=str, required=True, help="Email is required")
        parser.add_argument('topic', type=str, required=True, help="Topic is required")

        args = parser.parse_args()

        answer = str(args['answer'])
        correct_answer = str(args['correct_answer'])
        question = str(args['question'])
        email = str(args['email'])
        topic = str(args['topic'])

        result = answer == correct_answer
        if result:
            def chatgpt(correct_answer, question):
                response = openai.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": "You are going to write a statement demonstrating an autistic child's strength in a topic." },
                        {"role": "user", "content": "Given a question '" + question + "' and an answer '" + correct_answer + "' that the autistic child chose, write a statement that states the child's strength in the topic. Be very brief, include only important words."}
                    ]
                )
                return response.choices[0].message.content
            
            # Determine which column to update
            if topic == "life":
                column = "lifeWords"
            elif topic == "social":
                column = "socialWords"
            elif topic == "academic":
                column = "academicWords"

            # Generate the new phrase from GPT
            phrase = chatgpt(correct_answer, question)

            # Retrieve existing JSON data from the specified column
            with connection.cursor() as cursor:
                cursor.execute(f'SELECT "{column}" FROM users WHERE email = %s', (email,))
                existing_data = cursor.fetchone()

            if existing_data and existing_data[0]:
                # Check if the existing data is already a list or string
                if isinstance(existing_data[0], str):
                    # Load the JSON if it's a string
                    existing_json = json.loads(existing_data[0])
                else:
                    # If it's already a list, use it directly
                    existing_json = existing_data[0]
            else:
                # Initialize as an empty list if no data exists
                existing_json = []

            # Append the new phrase to the existing data
            existing_json.append(phrase)

            # Update the column with the modified JSON data
            updated_json = json.dumps(existing_json)
            with connection.cursor() as cursor:
                cursor.execute(f'UPDATE users SET "{column}" = %s WHERE email = %s', (updated_json, email))
                connection.commit()


            with connection.cursor() as cursor:
                cursor.execute(f'SELECT "{column}" FROM users WHERE email = %s', (email,))
                result = cursor.fetchone()

            connection.close()

            # Check if any data was retrieved
            if result and result[0]:
                # Parse the result (if it's a string) and print it
                if isinstance(result[0], str):
                    json_data = json.loads(result[0])  # Convert JSON string to Python object
                else:
                    json_data = result[0]  # It's already a Python object
                print(f"Content of {column} for {email}: {json_data}")
            else:
                print(f"No data found in {column} for {email}.")
                connection.close()

        return jsonify({'is_correct': result})