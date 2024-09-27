from flask_restful import Resource, reqparse
from flask import jsonify
import openai
import json

class quizQuestionsApi(Resource):

    def post(self):

        # Load OpenAI API key from JSON file
        with open('apikey.json', 'r') as file:
            json_data = file.read()
        parsed_data = json.loads(json_data)
        openai.api_key = parsed_data['api_key']

        parser = reqparse.RequestParser()
        parser.add_argument('questionType', type=str, required=True, help="Question type is required")
        parser.add_argument('level', type=str, required=True, help="Level is required")

        args = parser.parse_args()

        question_type = str(args['questionType'])
        level = str(args['level'])

        def send_chat_messages(question_type, level):
            """
            Sends a chat message to the OpenAI API and returns the response content.
            """
            try:
                # Create chat completion request
                response = openai.chat.completions.create(
                    model="gpt-4o-mini",  # Update model ID as appropriate
                    messages=[
                        {"role": "system", "content": "You are writing a quiz question for an autistic person on a " + level + " level"},
                        {"role": "user", "content": "Write me a quiz question about " + question_type + ". Give 4 answer choices in A B C D format."}
                    ]
                )
                # Return the response content
                output = response.choices[0].message.content
                output = output.replace('*', '')

                # Splitting the string based on new lines
                lines = output.split('\n')

                # Extracting the quiz question
                question = lines[0].replace("Quiz Question: ", "").strip()

                # Extracting the answer choices
                answers = {}
                for line in lines:
                    if line.startswith("A)"):
                        answers['A'] = line.replace("A)", "").strip()
                    elif line.startswith("B)"):
                        answers['B'] = line.replace("B)", "").strip()
                    elif line.startswith("C)"):
                        answers['C'] = line.replace("C)", "").strip()
                    elif line.startswith("D)"):
                        answers['D'] = line.replace("D)", "").strip()

                # Extracting the correct answer
                correct_answer = lines[-1].replace("Correct Answer: ", "").strip()

                # Structuring into a JSON-like dictionary
                quiz_data = {
                    "quiz_question": question,
                    "answers": answers,
                    "correct_answer": correct_answer
                }

                # Converting the dictionary to JSON format
                quiz_json = json.dumps(quiz_data, indent=4)

                return quiz_json

            except Exception as e:
                return f"An error occurred: {str(e)}"

        return jsonify(send_chat_messages(question_type, level))
