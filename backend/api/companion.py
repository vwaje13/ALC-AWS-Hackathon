from flask_restful import Resource, reqparse
from flask import jsonify
import openai
import json
import psycopg2
from db import get_db_connection

class companionApi(Resource):

  def post(self):

    #get the connection
    connection = get_db_connection()
    
    # Load OpenAI API key from JSON file
    with open('apikey.json', 'r') as file:
        json_data = file.read()
    parsed_data = json.loads(json_data)
    openai.api_key = parsed_data['api_key']

    parser = reqparse.RequestParser()
    parser.add_argument('topic', type=str)
    parser.add_argument('input', type=str)
    parser.add_argument('email', type=str)
    args = parser.parse_args()

    topic = str(args['topic'])
    input = str(args['input'])
    email = str(args['email'])

    if topic == "life":
        columna = "lifeWords"
        columnb = "lifeTag"
    elif topic == "social":
        columna = "socialWords"
        columnb = "socialTag"
    elif topic == "academic":
        columna = "academicWords"
        columnb = "academicTag"

    # Get the user's profile and currentTag from the database
    with connection.cursor() as cursor:
        # Correct SQL query to select both columna and columnb
        query = f'SELECT "{columna}", "{columnb}" FROM users WHERE email = %s'
        cursor.execute(query, (email,))
        result = cursor.fetchone()

    # Store the data into words and tags variables
    words = result[0]  # Data from columna (e.g., lifeWords, socialWords, academicWords)
    tags = result[1]   # Data from columnb (e.g., lifeTag, socialTag, academicTag)

    # Now words and tags hold the data from the respective columns


    def talk_with_bot(ws, ts, input, topic):
        """
        Sends a chat message to the OpenAI API and returns the response content.
        """
        try:
            # Create chat completion request
            response = openai.chat.completions.create(
                model="gpt-4o-mini",  # Update model ID as appropriate
                messages=[
                    {"role": "system", "content": "You are a virtual companion for an autistic person in the of " + topic + "skills and subtopic of " + ts + " with a skill set of " + ws + "."},
                    {"role": "user", "content": input}
                ]
            )
            # Return the response content
            return response.choices[0].message.content
        except Exception as e:
            return f"An error occurred: {str(e)}"
    
    # Ensure words and tags are not None
    if words is None:
        words = ""

    if tags is None:
        tags = ""
        
    # Convert words and tags to string if necessary
    if words:
        if isinstance(words, (list, dict)):
            words = json.dumps(words)
        else:
            words = str(words)

    if tags:
        tags = str(tags)

    return jsonify(talk_with_bot(words, tags, input, topic))