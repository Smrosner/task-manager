from flask import Flask
from flask_cors import CORS
from .database import setup_database
from .controllers.tasks import register_routes

def create_app():
    app = Flask(__name__)
    CORS(app)
    setup_database(app)
    register_routes(app)
    return app