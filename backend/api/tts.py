from flask_restful import Resource, reqparse
from flask import jsonify
from pathlib import Path
import openai
import json
from openai import OpenAI

class ttsApi(Resource):

  def post(self):

    # Load OpenAI API key from JSON file
    with open('apikey.json', 'r') as file:
        json_data = file.read()
    parsed_data = json.loads(json_data)
    openai.api_key = parsed_data['api_key']

    parser = reqparse.RequestParser()
    parser.add_argument('text', type=str)
    args = parser.parse_args()

    text = args['text']


    def get_tts(text):
        """
        Sends a chat message to the OpenAI API and returns the response content.
        """

        speech_file_path = Path(__file__).parent / "speech.mp3"
        client = OpenAI(api_key=openai.api_key)
        response = client.audio.speech.create(
        model="tts-1",
        voice="alloy",
        input=text
        )
        response.stream_to_file(speech_file_path)
        
    return jsonify(get_tts(str(text)))
