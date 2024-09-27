from flask_restful import Resource, reqparse
from db import get_db_connection

class loginChecker(Resource):
    def post(self):
        # Parse incoming JSON request data
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help="Email is required")
        parser.add_argument('password', type=str, required=True, help="Password is required")
        
        args = parser.parse_args()
        email = args['email']
        password = args['password']
        
        # Get the database connection
        connection = get_db_connection()
        with connection.cursor() as cursor:
            # Fetch user with matching email and password
            cursor.execute("SELECT email, password FROM users WHERE email = %s AND password = %s", (email, password))
            result = cursor.fetchone()
        
        # Check if a result was found
        if result:
            return {"message": "Login successful"}, 200
        else:
            return {"message": "Invalid credentials"}, 400