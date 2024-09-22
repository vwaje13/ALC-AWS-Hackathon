from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.story import storyApi
from api.childProfileLeveling import childProfileLevelingApi
from api.tts import ttsApi

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(storyApi, '/story/')
api.add_resource(ttsApi, '/tts/')
api.add_resource(childProfileLevelingApi, '/childProfileLeveling/'
