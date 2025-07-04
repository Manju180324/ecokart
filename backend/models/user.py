from db.config import db
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
'''
Think of db.Model as an abstract class.
It gives you the rules and structure you must follow (like: define db.Columns).
It also gives you default behaviors like .query, .filter_by, .commit, etc.
'''