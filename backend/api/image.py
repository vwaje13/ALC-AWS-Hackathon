from flask_restful import Resource, reqparse
from flask import request, jsonify
import requests
import json

class imageApi(Resource):
    def post(self):
        image_api_key = ""
        try:
            # Load Image API key from JSON file
            with open('imageApikey.json', 'r') as file:
                json_data = file.read()
            parsed_data = json.loads(json_data)
            image_api_key = parsed_data['image_api_key']
        
            # Parse input arguments
            parser = reqparse.RequestParser()
            parser.add_argument('answer_choice', type=str, required=True, help="answer_choice is required")
            args = parser.parse_args()

            answer_choice = args['answer_choice']

            # Send request to text-to-image API
            r = requests.post(
                "https://api.deepai.org/api/text2img",
                data={'text': answer_choice},
                headers={'api-key': image_api_key}
            )

            # Check if the request was successful
            if r.status_code == 200:
                response_data = r.json()
                # Return the image URL from the response
                return jsonify({"image_url": response_data.get('output_url')})
            else:
                return jsonify({"error": "Failed to generate image"}), r.status_code

        except Exception as e:
            return jsonify({"error": str(e)}), 500
