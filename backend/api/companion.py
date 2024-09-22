from flask_restful import Resource, reqparse
from flask import jsonify
import openai
import json

class companionApi(Resource):

  def post(self):

    # Load OpenAI API key from JSON file
    with open('apikey.json', 'r') as file:
        json_data = file.read()
    parsed_data = json.loads(json_data)
    openai.api_key = parsed_data['api_key']

    parser = reqparse.RequestParser()
    parser.add_argument('topic', type=str)
    parser.add_argument('grade', type=str)
    parser.add_argument('skill_level', type=str)
    args = parser.parse_args()

    topic = args['topic']
    grade = args['grade']
    skill_level = args['skill_level']

    def talk_with_bot(input, skill_level, section):
        """
        Sends a chat message to the OpenAI API and returns the response content.
        """

        try:
            # Create chat completion request
            response = openai.chat.completions.create(
                model="gpt-4o-mini",  # Update model ID as appropriate
                messages=[
                    {"role": "system", "content": "You are a virtual companion for an autistic person with a " + skill_level + " skill level in the field of " + section + "."},
                    {"role": "user", "content": input}
                ]
            )
            # Return the response content

            return response.choices[0].message.content
        except Exception as e:
            return f"An error occurred: {str(e)}"
 
    return jsonify(talk_with_bot(topic, grade))