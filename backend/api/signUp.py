from flask_restful import Resource, reqparse
from db import get_db_connection

class signUpApi(Resource):
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
        try:
            with connection.cursor() as cursor:
                # Insert the new user into the database
                cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s);", (email, password))
                connection.commit()
                
                # Return success message in JSON format
                return {"message": "User registered successfully"}, 201
        except Exception as e:
            # If an error occurs, rollback the transaction and return an error message
            connection.rollback()
            return {"message": "An error occurred while registering the user", "error": str(e)}, 500
        finally:
            # Close the cursor and connection
            cursor.close()
            connection.close()