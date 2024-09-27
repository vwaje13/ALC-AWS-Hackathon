import assemblyai as aai
from flask_restful import Resource, reqparse
from flask import jsonify
import json

class sttApi(Resource):

  def post(self):

    with open('speechTextApiKey.json', 'r') as file:
        json_data = file.read()
        parsed_data = json.loads(json_data)
        aai.settings.api_key = parsed_data['speech_text_api_key']
    
    parser = reqparse.RequestParser()
    parser.add_argument('audio_path', type=str, required=True, help="Audio path is required")  # either life, social, or academic

    args = parser.parse_args()

    audio_path = str(args['audio_path'])

    transcriber = aai.Transcriber()

    transcript = transcriber.transcribe(audio_path)

    return jsonify({"text" : transcript})