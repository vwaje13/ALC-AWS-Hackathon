import assemblyai as aai
from flask_restful import Resource
from flask import jsonify
import json

class sttApi(Resource):

  def post(self):

    with open('speechTextApiKey.json', 'r') as file:
        json_data = file.read()
    parsed_data = json.loads(json_data)
    aai.settings.api_key = parsed_data['speech_text_api_key']

    transcriber = aai.Transcriber()

    transcript = transcriber.transcribe("./my-local-audio-file.mp3")

    return jsonify({"text" : transcript})