from flask import Flask, request, jsonify
from flask_cors import CORS
from db.config import db
from routes.auth import auth_bp
from routes.product import product_bp
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from routes.checkout import checkout_bp

app = Flask(__name__)
CORS(app)

#config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecokart.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-256-bit-secret-key'

#initialize extensions
db.init_app(app)
jwt = JWTManager(app)

#register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(product_bp)
app.register_blueprint(checkout_bp)

#create tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify({"message": "WELCOME TO ECOKART "})

if __name__ == '__main__':
    app.run(debug=True)