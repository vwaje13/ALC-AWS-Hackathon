from flask_restful import Resource, reqparse
from flask import jsonify
import ssl
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk import pos_tag
import openai
import json

# Disable SSL certificate verification bro idk
ssl._create_default_https_context = ssl._create_unverified_context

# Initialize NLTK resources
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')

class diagnosisApi(Resource):
    def post(self):
        
        # Load OpenAI API key from JSON file
        with open('apikey.json', 'r') as file:
            json_data = file.read()
        parsed_data = json.loads(json_data)
        openai.api_key = parsed_data['api_key']
        
        
        # Parse incoming request
        parser = reqparse.RequestParser()
        parser.add_argument('diag_response', type=str)
        args = parser.parse_args()
        diag_response = args['diag_response']
        
        # Preprocess the free-response text
        if diag_response is None:
            return {"error": "No response provided"}, 400

        # Tokenize the response
        tokens = word_tokenize(diag_response.lower())
        
        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word not in stop_words]
        
        # POS tagging to extract meaningful words (nouns, verbs, adjectives)
        tagged_tokens = pos_tag(filtered_tokens)
        
        # Extract nouns, verbs, and adjectives as the most meaningful words
        meaningful_words = [word for word, pos in tagged_tokens if pos in ['NN', 'VB', 'JJ']]
        
        # Generate a dynamic phrase using ChatGPT
        phrase = self.generate_dynamic_phrase(meaningful_words)
        
        # Return the dynamic phrase as a response
        return jsonify({"description": phrase})
    
    def generate_dynamic_phrase(self, words):
        # Use the extracted meaningful words to create a prompt for ChatGPT
        prompt = f"Based on these key words from a diagnosis: {', '.join(words)}, generate a phrase that describes the child's proficiency in the given sector."

        # ChatGPT API Call (make sure to replace with your OpenAI API key)
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an assistant that generates meaningful phrases from words"},
                {"role": "user", "content": prompt}
            ]
        )
        
        # Extract and return the response from the ChatGPT API
        generated_phrase = response.choices[0].message.content
        return generated_phrase