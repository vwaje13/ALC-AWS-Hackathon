from flask_restful import Resource, reqparse
from flask import request, jsonify
import requests
import json
from db import get_db_connection

class loginChecker(Resource):
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)


        args = parser.parse_args()
        email = args['email']
        password = args['password']
        
        if not email:
            return jsonify({"message": "Email is required"}), 400
        elif not password:
            return jsonify({"message": "Password is required"}), 400
        
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
            # check if this returned anything, if did, return 200, if not, return 400
