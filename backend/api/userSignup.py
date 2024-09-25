from flask import Blueprint, request, jsonify
from db import get_db_connection  # Import the DB connection function from ../db.py

user_signup_bp = Blueprint('user_signup', __name__) #lowkey idek what this does

@user_signup_bp.route('/userSignup', methods=['POST'])
def user_signup():
    loginInfo = request.get_json()  # request all info from frontend for this route
    email = loginInfo.get('email') 
    password = loginInfo.get('password')
    name = loginInfo.get('name')
    phoneNumber = loginInfo.get('phoneNumber')
    print(loginInfo)


    # Establish connection to the PostgreSQL database
    connection = get_db_connection()
    cur = connection.cursor()

    #email, password, phoneNumber, name
    # SQL statement to retrieve password from matching email
    sql_query ="""
    INSERT INTO users (email, password, "phoneNumber", name)
    VALUES (%s, %s, %s, %s);
    """ # i put user in quotation marks bevause  user is a reserved keyword in PostgreSQL
    
    # Execute the SQL query, passing the user input as parameters
    cur.execute(sql_query, (email, password, phoneNumber, name))

    # Commit the changes to the database
    connection.commit()


    # Close the cursor and connection
    cur.close()
    connection.close()

    return jsonify(message="Signup successful!", )


