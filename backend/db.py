import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()  # loads the .env file which contains db url

def get_db_connection():
    url = os.getenv('DATABASE_URL')  # load the db url
    connection = psycopg2.connect(url, user="postgres", password="Biggulp!123")
    return connection