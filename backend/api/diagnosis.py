from flask_restful import Resource, reqparse
from flask import request, jsonify
import json
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

class diagnosisApi(Resource):
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('diag_response', type=str)
        
        args = parser.parse_args()
        diag_response = args['diag_response']
            
            #first I would have the multiple choice questions. 
            # I would recieve the answers from the user and then I would use the answers to determine the level of the child.
            # Extract specific sections from the child profile

            # Preprocessing

        nltk.download('punkt')

        nltk.download('stopwords')
        nltk.download('wordnet')

        # Tokenize the response
        tokens = word_tokenize(diag_response.lower())

        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word not in stop_words]

        # Lemmatize tokens
        lemmatizer = WordNetLemmatizer()
        lemmatized_tokens = [lemmatizer.lemmatize(token) for token in filtered_tokens]

        # Processed response
        print(lemmatized_tokens)

        level_keywords = {
            "Level 1": ["struggles", "needs full help", "requires assistance", "unable"],
            "Level 2": ["needs guidance", "requires some help", "difficulty", "struggles"],
            "Level 3": ["mostly independent", "occasionally needs help", "basic understanding"],
            "Level 4": ["handles independently", "advanced understanding", "minimal guidance"],
            "Level 5": ["excels", "fully independent", "advanced", "proficient"]
        }

        # Function to categorize based on keyword matching
        def categorize_response(tokens):
            for level, keywords in level_keywords.items():
                for keyword in keywords:
                    if keyword in ' '.join(tokens):
                        return level
            return "Level not determined"

        # Categorize the sample response
        category = categorize_response(lemmatized_tokens)
        print(f"The response falls under: {category}")

        # eventually incorporate the learning style, ... ?

        # Define descriptive levels
        descriptive_levels = {
            "Level 1": "The child struggles significantly and requires full assistance.",
            "Level 2": "The child requires significant support but can perform some tasks with guidance.",
            "Level 3": "The child is somewhat independent but needs regular help with complex tasks.",
            "Level 4": "The child is mostly independent and requires minimal support.",
            "Level 5": "The child is fully independent and performs tasks at an advanced level."
        }

        # Assign the corresponding description
        description = descriptive_levels.get(category, "Unable to determine the level.")
        print(description)

        return jsonify(description)
    
    
