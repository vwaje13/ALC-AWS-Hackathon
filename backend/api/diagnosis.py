from flask_restful import Resource, reqparse
from flask import jsonify
import spacy
from textblob import TextBlob
import json
import pprint
import psycopg2
from db import get_db_connection  # Import the DB connection function from ../db.py

class diagnosisApi(Resource):

    def store_into_db(self, text):
        if text is None:
            return {"error": "No response provided"}, 400

        # Load spaCy English model
        nlp = spacy.load('en_core_web_sm')

        # Step 1: Text Preprocessing
        # Sentence Segmentation
        doc = nlp(text)
        sentences = [sent.text.strip() for sent in doc.sents]

        # Initialize list to store structured data
        data = []

        # Define helper function to classify sentences
        def classify_sentence(sent):
            # Lowercase the sentence
            sent_lower = sent.lower()

            # Keywords indicating weaknesses
            weakness_indicators = [
                'needs help',
                'struggles',
                'needs reminders',
                'needs encouragement',
                'needs additional time',
                'requires',
                'but needs',
                'needs some',
                'requires full assistance',
                'requires significant assistance',
                'requires assistance',
                'needs occasional reminders',
                'needs help with some aspects',
                'experiences distress or difficulty',
                'hesitant at first',
                'needs time to adjust',
                'avoids',
                'withdraws',
                'finds it difficult',
                'has difficulty',
                'faces significant challenges',
                'faces significant difficulty',
                'struggles significantly',
                'requires extensive support',
                'finds challenging',
                'needs substantial help',
                'requires step-by-step guidance',
                'has difficulty staying focused',
                'occasionally needs reminders',
                'needs guidance',
                'sometimes needs prompts',
                'rarely',
                'struggles to accept feedback',
                'reacts negatively',
                'rarely asks for help',
                'gets upset or withdraws',
                'needs supervision',
                'struggles to follow social rules',
                'struggles to resolve conflicts',
                'sometimes participates but needs encouragement',
                'needs help or reminders',
                'sometimes accepts feedback but may get upset or defensive',
                'struggles with memorization and recalling facts',
                'finds writing tasks challenging',
                'needs assistance',
                'requires full supervision',
                'needs reminders to',
                'struggles to recognize or respond to social cues',
                'struggles to express emotions appropriately',
                'struggles with turn-taking and sharing',
                'struggles to engage with unfamiliar people',
                'needs help with specific tasks',
                'needs occasional reminders or assistance',
                'requires significant help',
                'needs assistance to perform tasks',
                'needs prompts to respond appropriately',
                'needs help with spelling or sentence structure',
                'needs encouragement to stay engaged',
                'needs help or reminders for telling time or measurements',
                'needs additional time or strategies to effectively memorize',
                'finds it difficult to comprehend spoken instructions or discussions',
                'has difficulty staying attentive and comprehending',
                'avoids or struggles with problem-solving tasks and needs support',
                'needs help with some words or comprehension while reading',
                'requires occasional help or reminders',
                'requires full supervision to manage safety tasks',
                'requires assistance to follow health-related routines'
            ]
            # Keywords indicating strengths
            strength_indicators = [
                'independently',
                'confidently',
                'solves',
                'performs',
                'writes',
                'recognizes',
                'understands',
                'listens attentively',
                'comprehends',
                'completes',
                'follows instructions',
                'fully independent',
                'independent in managing',
                'manages daily routine independently',
                'adapts easily',
                'performs tasks independently',
                'fully responsible',
                'manages tasks independently',
                'follows routines independently',
                'consistently',
                'actively initiates',
                'easily understands',
                'responds appropriately',
                'enjoys and participates actively',
                'clearly and consistently expresses emotions',
                'consistently follows social rules',
                'resolves conflicts appropriately',
                'accepts feedback well',
                'consistently asks for help when needed',
                'reads independently and comprehends well',
                'writes confidently and independently',
                'completes tasks without issues',
                'actively participates',
                'recalls facts with ease',
                'understands without difficulty',
                'accepts feedback and criticism well',
                'identifies independently',
                'understands and follows',
                'performs basic math tasks independently',
                'uses the restroom independently without assistance',
                'fully independent with feeding',
                'manages safety tasks independently',
                'follows health-related routines independently',
                'participates actively',
                'enjoys group activities',
                'quickly becomes comfortable with unfamiliar people',
                'clearly expresses emotions',
                'resolves conflicts and disagreements appropriately',
                'asks for help when needed',
                'accepts feedback and responds appropriately',
                'reads age-appropriate material independently and comprehends well',
                'writes sentences or stories confidently and independently',
                'completes problem-solving tasks independently',
                'listens attentively and understands spoken instructions or discussions',
                'understands how to tell time and basic measurements without difficulty',
                'follows instructions during activities independently',
                'actively participates and completes tasks without issues',
                'identifies shapes, colors, and numbers independently',
                'recalls facts and vocabulary with ease'
            ]

            # Check for weakness indicators
            for phrase in weakness_indicators:
                if phrase in sent_lower:
                    return 'Weakness'

            # Check for strength indicators
            for phrase in strength_indicators:
                if phrase in sent_lower:
                    return 'Strength'

            # Use sentiment analysis as a fallback
            blob = TextBlob(sent)
            sentiment = blob.sentiment.polarity
            if sentiment >= 0:
                return 'Strength'
            else:
                return 'Weakness'

        # Process each sentence
        for sent in sentences:
            # Process the sentence with spaCy
            doc_sent = nlp(sent)

            # Classify sentence as Strength or Weakness
            category = classify_sentence(sent)

            # Extract skills or abilities (noun phrases)
            skills = [chunk.text for chunk in doc_sent.noun_chunks]

            # Extract performance level and assistance required
            assistance_required = 'No'
            if 'needs' in sent.lower() or 'struggles' in sent.lower():
                assistance_required = 'Yes'

            # Extract confidence level
            if 'confidently' in sent.lower():
                confidence_level = 'High'
            elif 'struggles' in sent.lower():
                confidence_level = 'Low'
            else:
                confidence_level = ''

            # Build context (the sentence itself)
            context = sent

            # Build a dictionary for the sentence
            entry = {
                'Skill/Ability': ', '.join(skills),
                'Category': category,
                'AssistanceRequired': assistance_required,
                'ConfidenceLevel': confidence_level,
                'Context': context
            }

            # Add to data list
            data.append(entry)

        # Convert to JSON format
        data_json = json.dumps(data, indent=2)

        # Now, we can return the processed data
        return data_json

    def post(self):
        # Get the db connection
        connection = get_db_connection()

        # Parse incoming request
        parser = reqparse.RequestParser()
        parser.add_argument('social_response', type=str)
        parser.add_argument('life_response', type=str)
        parser.add_argument('academic_response', type=str)
        parser.add_argument('email', type=str)
        args = parser.parse_args()

        # Get the responses from the request
        social_text = args['social_response']
        life_text = args['life_response']
        academic_text = args['academic_response']
        email = args['email']

        # Process and store the data
        social_data = self.store_into_db(social_text)
        life_data = self.store_into_db(life_text)
        academic_data = self.store_into_db(academic_text)

        # Update the database
        try:
            cursor = connection.cursor()

            # Update socialWords column in the users table
            update_query_social = """
                UPDATE users
                SET "socialWords" = %s
                WHERE email = %s
            """
            cursor.execute(update_query_social, (social_data, email))

            # Update lifeWords column in the users table
            update_query_life = """
                UPDATE users
                SET "lifeWords" = %s
                WHERE email = %s
            """
            cursor.execute(update_query_life, (life_data, email))

            # Update academicWords column in the users table
            update_query_academic = """
                UPDATE users
                SET "academicWords" = %s
                WHERE email = %s
            """
            cursor.execute(update_query_academic, (academic_data, email))

            # Commit the transaction
            connection.commit()

            # Close the cursor
            cursor.close()

        except Exception as e:
            # Handle exceptions, e.g., log the error
            print(f"Database update error: {e}")
            return {"error": "Database update failed"}, 500

        finally:
            # Close the database connection
            if connection:
                connection.close()

        # Return success response
        return {"social_data": social_data, "life_data": life_data, "academic_data": academic_data}, 200