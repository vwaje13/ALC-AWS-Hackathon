from flask_restful import Resource
import openai
from flask import request, jsonify
import json

class childProfileLevelingApi(Resource):
    def post(self):
        try:
            # Load OpenAI API key from JSON file
            with open('apikey.json', 'r') as file:
                json_data = file.read()
            parsed_data = json.loads(json_data)
            openai.api_key = parsed_data['api_key']

            # Helper function to send messages to OpenAI
            def send_chat_messages(content):
                """
                Sends a chat message to the OpenAI API and returns the response content.
                """
                try:
                    # Create chat completion request
                    completion = openai.ChatCompletion.create(
                        model="gpt-4o-mini",  # Correct the model ID
                        messages=[
                            {"role": "system", "content": "You are a helpful assistant."},
                            {"role": "user", "content": content}
                        ]
                    )
                    # Return the response content
                    return completion.choices[0].message['content']
                except Exception as e:
                    return f"An error occurred with OpenAI: {str(e)}"

            # Get the JSON data from the request body
            data = request.get_json()

            # Extract specific sections from the child profile
            child_name = data.get("childProfile", {}).get("name", "Child")
            life_skills = data.get("childProfile", {}).get("assessments", {}).get("lifeSkills", {})
            academic_skills = data.get("childProfile", {}).get("assessments", {}).get("academicSkills", {})
            social_skills = data.get("childProfile", {}).get("assessments", {}).get("socialSkills", {})

            # Check if profile data is missing
            if not life_skills and not academic_skills and not social_skills:
                return jsonify({"error": "Profile data is incomplete or missing."}), 400

            # Format the extracted data into a prompt for OpenAI
            openAI_prompt = f"Based on the child profile for {child_name}, identify which level out of 50 the child would be on Life Skills, Academics, and Social Skills. Don't explain just give the level for each one in a new line. " \
                            f"\n\nHere are the details:\n\nLife Skills:\n{life_skills}\n\nAcademic Skills:\n{academic_skills}\n\nSocial Skills:\n{social_skills}"

            # Send the formatted prompt to OpenAI
            response = send_chat_messages(openAI_prompt)

            # Return the generated response as a JSON object
            return jsonify(response)

        except Exception as e:
            return jsonify({"error": str(e)}), 500
