from flask_restful import Resource, reqparse
from flask import jsonify
import openai
import json
import random
from db import get_db_connection

class storyApi(Resource):

    def post(self):

        # Load OpenAI API key from JSON file
        with open('apikey.json', 'r') as file:
            json_data = file.read()
        parsed_data = json.loads(json_data)
        openai.api_key = parsed_data['api_key']

        # Connect to the database
        connection = get_db_connection()

        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help="Overall sector is required")  # either life, social, or academic
        parser.add_argument('email', type=str, required=True, help="Email is required")

        args = parser.parse_args()

        topic = str(args['topic'])
        email = str(args['email'])

        # Get the user's profile and currentTag from the database
        if topic == "life":
            column = "lifeWords"
            tag_type = "lifeTag"
            tags = [
                'Hygiene',
                'Dressing',
                'Grooming',
                'Cooking',
                'Cleaning',
                'Laundry',
                'Time Management',
                'Safety',
                'Nutrition',
                'First Aid',
                'Organization',
                'Toileting',
                'Personal Space',
                'Household Tasks',
                'Sleep Routine',
                'Food Choice',
                'Dressing Appropriately',
                'Emergency Skills',
                'Self-Care',
                'Table Manners',
                'Brushing Teeth',
                'Bathing',
                'Locking Doors',
                'Counting Money',
                'Recycling',
                'Sorting Laundry',
                'Using an Alarm',
                'Packing a Bag',
                'Following a Recipe',
                'Setting the Table',
                'Pouring Drinks',
                'Handwashing',
                'Adjusting to Change',
                'Personal Responsibility',
                'Medication Management'
            ]
        elif topic == "social":
            column = "socialWords"
            tag_type = "socialTag"
            tags = [
                'Communication',
                'Listening',
                'Eye Contact',
                'Sharing',
                'Cooperation',
                'Turn-Taking',
                'Empathy',
                'Conflict Resolution',
                'Personal Boundaries',
                'Greetings',
                'Conversational Skills',
                'Group Participation',
                'Teamwork',
                'Manners',
                'Asking for Help',
                'Expressing Emotions',
                'Nonverbal Cues',
                'Play Skills',
                'Assertiveness',
                'Friendships',
                'Patience',
                'Apologizing',
                'Encouragement',
                'Active Listening',
                'Compliments',
                'Following Rules',
                'Role Playing',
                'Assertive Communication',
                'Negotiation',
                'Social Cues',
                'Handling Criticism',
                'Expressing Needs',
                'Listening to Others',
                'Inviting Others',
                'Dealing with Disappointment',
                'Flexibility',
                'Greeting Others',
                'Saying Goodbye',
                'Respect',
                'Personal Space',
                'Joining Conversations',
                'Interpreting Body Language',
                'Asking Questions',
                'Giving Directions',
                'Giving Feedback',
                'Handling Rejection',
                'Managing Anger',
                'Handling Interruptions'
            ]
        elif topic == "academic":
            column = "academicWords"
            tag_type = "academicTag"
            tags = [
                'Reading',
                'Writing',
                'Math',
                'Counting',
                'Spelling',
                'Vocabulary',
                'Science',
                'Problem-Solving',
                'Phonics',
                'Comprehension',
                'Grammar',
                'Storytelling',
                'Fine Motor',
                'Sorting',
                'Geography',
                'History',
                'Memorization',
                'Classification',
                'Attention',
                'Listening Comprehension',
                'Creativity',
                'Letter Recognition',
                'Number Recognition',
                'Colors',
                'Shapes',
                'Telling Time',
                'Basic Addition',
                'Basic Subtraction',
                'Multiplication',
                'Division',
                'Word Problems',
                'Reading Fluency',
                'Reading Comprehension',
                'Fact Recall',
                'Drawing',
                'Art Skills',
                'Basic Biology',
                'Earth Science',
                'Social Studies',
                'Measurement'
            ]
        with connection.cursor() as cursor:
            cursor.execute(f'SELECT "{column}", "{tag_type}" FROM users WHERE email = %s', (email,))
            result = cursor.fetchone()

        # Extract the first value (column data) and the current tag
        if result and result[0]:
            dat = json.dumps(result[0])  # Convert JSON object/list to string
            print(dat)
            current_tag = result[1]  # The currentTag value from the database
        else:
            return jsonify({"error": "No data found for the specified email and topic."})

        def send_chat_message_for_single_question(topic, tag, data):
            """
            Sends a chat message to the OpenAI API and returns a single quiz question.
            """
            try:
                # Create chat completion request to generate a single question
                response = openai.chat.completions.create(
                    model="gpt-4",  # Update model ID as appropriate
                    messages=[
                        {"role": "system", "content": f"You are writing a story for an autistic person. The user has strengths and weaknesses in the following areas: {data}. The story should be about {topic} skills, specifically focused on the tag: {tag}. Make sure the moral is simple and clear, and give the story a title on the first line."},
                        {"role": "user", "content": f"Please write a simple, easy-to-understand story involving the learning of {topic} skills, with a focus on {tag}. "}
                    ]
                )
                
                print(response.choices[0].message.content)

                # Correcting attribute access for message content
                output = response.choices[0].message.content.strip()

                # Splitting the string based on new lines
                lines = [line.strip() for line in output.split('\n') if line.strip()]

                # Extracting the quiz question
                title = ""
                for line in lines:
                    if "Title:" in line:
                        title = line.replace("Title:", "").strip()
                        lines.remove(line)
                        break
                
                bodyText = "\n".join(lines)


                # Return a single quiz question
                return {
                    "title": title,
                    "body": bodyText,
                }

            except Exception as e:
                return f"An error occurred: {str(e)}"
        
        # now update the tag in the database

        
        # Generate and return a single quiz question
        story_data = send_chat_message_for_single_question(topic, current_tag, dat)

        # Return the quiz question as a JSON response
        return jsonify(story_data)