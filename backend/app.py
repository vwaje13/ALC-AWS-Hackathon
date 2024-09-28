from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS # CORS support
from api.story import storyApi
from api.image import imageApi
from api.tts import ttsApi
from api.companion import companionApi
from api.diagnosis import diagnosisApi
from api.logincheck import loginChecker
from api.answerVerification import answerVerificationApi
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for
from api.quizQuestions import quizQuestionsApi
from api.signUp import signUpApi

app = Flask(__name__, static_url_path='', static_folder='build')

# Setup CORS to allow requests from any origin. Restrict as necessary for deployment.
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Adjust "*" to specific origins if needed.

# Initialize API
api = Api(app)

# Routes
@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

# Resource mappings
api.add_resource(storyApi, '/story/')
api.add_resource(ttsApi, '/tts/')
api.add_resource(imageApi, '/image/')
api.add_resource(companionApi, '/companion/')
api.add_resource(diagnosisApi, '/diagnosis/')
api.add_resource(quizQuestionsApi, '/quizQuestions/')
api.add_resource(loginChecker, '/logincheck/')
api.add_resource(answerVerificationApi, '/answerVerification/')
api.add_resource(signUpApi, '/signUp/')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))