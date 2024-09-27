from flask_restful import Resource, reqparse
from flask import jsonify
import spacy
from textblob import TextBlob
import json
import pprint
from db import get_db_connection  # Import the DB connection function from ../db.py


class diagnosisApi(Resource):
    def post(self):
        
        # Get the db connection
        connection = get_db_connection()

        # Parse incoming request
        parser = reqparse.RequestParser()
        parser.add_argument('diag_response', type=str)
        args = parser.parse_args()
        text = args['diag_response']
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

            # Add to data list add to db!!!!
            data.append(entry)

        # Now, we can store data in JSON format
        # For demonstration, we'll print the data
        
        print("Structured Data:")
        pprint.pprint(data)

        # Optionally, save the data to a JSON file
        with open('child_skills.json', 'w') as f:
            json.dump(data, f, indent=2)
            



        return jsonify(meaningful_words)