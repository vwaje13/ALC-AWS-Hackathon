from flask_restful import Resource, reqparse
from flask import jsonify
import json
import re

class answerVerificationApi(Resource):
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('answer', type=str, required=True, help="Answer is required")
        parser.add_argument('correct_answer', type=str, required=True, help="Correct Answer is required")

        args = parser.parse_args()

        answer = str(args['answer'])
        correct_answer = str(args['correct_answer'])

        result = answer == correct_answer
        return jsonify({'is_correct': result})

        


