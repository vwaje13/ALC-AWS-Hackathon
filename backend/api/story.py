from flask_restful import Resource, reqparse
from flask import jsonify
import openai
import json

class storyApi(Resource):

  def post(self):

    # Load OpenAI API key from JSON file
    with open('apikey.json', 'r') as file:
        json_data = file.read()
    parsed_data = json.loads(json_data)
    openai.api_key = parsed_data['api_key']

    parser = reqparse.RequestParser()
    parser.add_argument('topic', type=str)
    parser.add_argument('grade', type=str)
    args = parser.parse_args()

    topic = args['topic']
    grade = args['grade']

    def send_chat_messages(content, readingGrade):
        """
        Sends a chat message to the OpenAI API and returns the response content.
        """

        try:
            # Create chat completion request
            response = openai.chat.completions.create(
                model="gpt-4o-mini",  # Update model ID as appropriate
                messages=[
                    {"role": "system", "content": "You are writing a story for an autistic person with a " + readingGrade + " grade reading level."},
                    {"role": "user", "content": "Write me a short story about " + content}
                ]
            )
            # Return the response content

            return response.choices[0].message.content
        except Exception as e:
            return f"An error occurred: {str(e)}"
 
    return jsonify(send_chat_messages(topic, grade))