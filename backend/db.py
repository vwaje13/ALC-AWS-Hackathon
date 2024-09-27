import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()  # loads the .env file which contains db url

def get_db_connection():
    url = os.getenv('DATABASE_URL')  # load the db url
    username = os.getenv('DATABASE_USERNAME')
    password = os.getenv('DATABASE_PASSWORD')
    connection = psycopg2.connect(url, user=username, password=password)
    return connection