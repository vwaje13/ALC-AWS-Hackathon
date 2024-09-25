from flask import Blueprint, request, jsonify
from db import get_db_connection  # Import the DB connection function from ../db.py

user_login_bp = Blueprint('user_login', __name__) #lowkey idek what this does

@user_login_bp.route('/userLogin', methods=['POST'])
def user_login():
    loginInfo = request.get_json()  # request all info from frontend for this route
    email = loginInfo.get('email') 
    password = loginInfo.get('password')
    userID = ""

    # Establish connection to the PostgreSQL database
    connection = get_db_connection()
    cur = connection.cursor()

    # SQL statement to retrieve password from matching email
    sql_query ="""
    SELECT password
    FROM user
    WHERE email = %s;
    """
    
    # Execute the SQL query, passing the user input as parameters
    cur.execute(sql_query, (email, userID))

    # Commit the changes to the database
    result = cur.fetchone()

    if result:
        # Step 2: If email exists, check if the password matches
        stored_password = result[0]  # password from the database
        if password == stored_password:
            # Password matches
            response = jsonify(message="Login successful!", )
        else:
            # Password is incorrect
            response = jsonify(message="Incorrect password.", )
    else:
        # Email does not exist
        response = jsonify(message="Invalid email address.", )

    '''
    returns: json: 
    {
        "message": "Login successful!",
        "userID": "1",
        "success": true
    }
    '''

    # Close the cursor and connection
    cur.close()
    connection.close()
