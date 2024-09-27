from flask_restful import Resource, reqparse
from flask import jsonify
import openai
import json
import psycopg2
from db import get_db_connection

class quizQuestionsApi(Resource):

    def post(self):

        # Load OpenAI API key from JSON file
        with open('apikey.json', 'r') as file:
            json_data = file.read()
        parsed_data = json.loads(json_data)
        openai.api_key = parsed_data['api_key']

        # Connect to the database
        connection = get_db_connection()

        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help="Overall sector is required")  # either life, social, or academic
        parser.add_argument('email', type=str, required=True, help="Email is required")

        args = parser.parse_args()

        topic = str(args['topic'])
        email = str(args['email'])

        # Get the user's profile and currentTag from the database
        if topic == "life":
            column = "lifeWords"
        elif topic == "social":
            column = "socialWords"
        elif topic == "academic":
            column = "academicWords"

        with connection.cursor() as cursor:
            cursor.execute(f'SELECT "{column}", "currentTag" FROM users WHERE email = %s', (email,))
            result = cursor.fetchone()

        connection.close()

        # Extract the first value (column data) and the current tag
        if result and result[0]:
            dat = json.dumps(result[0])  # Convert JSON object/list to string
            current_tag = result[1]  # The currentTag value from the database
        else:
            return jsonify({"error": "No data found for the specified email and topic."})

        def send_chat_message_for_single_question(topic, tag, data):
            """
            Sends a chat message to the OpenAI API and returns a single quiz question.
            """
            try:
                # Create chat completion request to generate a single question
                response = openai.chat.completions.create(
                    model="gpt-4",  # Update model ID as appropriate
                    messages=[
                        {"role": "system", "content": f"You are writing a quiz question for an autistic person. The user has strengths and weaknesses in the following areas: {data}. The quiz question should be about {topic} skills, specifically focused on the tag: {tag}. Make sure the question is simple and clear, and provide 4 answer choices in A B C D format. Clearly indicate the correct answer."},
                        {"role": "user", "content": f"Please write a simple, easy-to-understand quiz question about {topic} skills, with a focus on {tag}. The question should have 4 answer choices in A B C D format and include the correct answer."}
                    ]
                )

                # Correcting attribute access for message content
                output = response.choices[0].message.content.strip()

                # Splitting the string based on new lines
                lines = [line.strip() for line in output.split('\n') if line.strip()]

                # Extracting the quiz question
                question = ""
                for line in lines:
                    if "Question:" in line:
                        question = line.replace("Question:", "").strip()
                        break

                # If the question is not extracted, use a fallback message
                if not question:
                    question = lines[0]

                # Extracting the answer choices
                # Extracting the answer choices
                answers = {}
                for line in lines:
                    if line.startswith("A)") or line.startswith("A."):
                        answers['A'] = line.replace("A)", "").replace("A.", "").strip()
                    elif line.startswith("B)") or line.startswith("B."):
                        answers['B'] = line.replace("B)", "").replace("B.", "").strip()
                    elif line.startswith("C)") or line.startswith("C."):
                        answers['C'] = line.replace("C)", "").replace("C.", "").strip()
                    elif line.startswith("D)") or line.startswith("D."):
                        answers['D'] = line.replace("D)", "").replace("D.", "").strip()

                # Extracting the correct answer
                correct_answer = ""
                for line in lines:
                    if "Correct Answer:" in line:
                        correct_answer = line.replace("Correct Answer:", "").strip()
                        break

                # Return a single quiz question
                return {
                    "quiz_question": question,
                    "answers": answers,
                    "correct_answer": correct_answer
                }

            except Exception as e:
                return f"An error occurred: {str(e)}"

        # Generate and return a single quiz question
        quiz_data = send_chat_message_for_single_question(topic, current_tag, dat)

        # Return the quiz question as a JSON response
        return jsonify(quiz_data)