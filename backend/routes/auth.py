from flask import Blueprint, request, jsonify
from db.config import db
from models.user import User
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = generate_password_hash(data.get('password'))
    
    user = User(name=name, email=email, password=password)
    db.session.add(user) # “Please queue this new user to be inserted into the database.”
    db.session.commit() # “Please commit the changes to the database.”  
    
    return jsonify({"message": "User registered successfully"}), 400
    
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401
    
    token = create_access_token(identity=user.id)
    return jsonify({"token": token,'user':{'id':user.id,'name':user.name}}), 200