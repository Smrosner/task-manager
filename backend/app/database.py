from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from .models import Task

def setup_database(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.app_context():
        db.init_app(app)
        db.create_all()