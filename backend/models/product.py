from db.config import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    eco_score = db.Column(db.Integer, nullable=False)  # e.g., 1 to 5
    stock = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)
