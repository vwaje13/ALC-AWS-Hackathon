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
                response = openai.ChatCompletion.create(
                    model="gpt-4o-mini",  # Update model ID as appropriate
                    messages=[
                        {"role": "system", "content": "You are writing a quiz question for an autistic person on a " + level + " level out of 100."},
                        {"role": "user", "content": "Write me a quiz question about " + question_type + ". Give 4 answer choices in A B C D format."}
                    ]
                )
                # Return the response content
                return response.choices[0].message['content']
            except Exception as e:
                return f"An error occurred: {str(e)}"

        return jsonify(send_chat_messages(question_type, level))
