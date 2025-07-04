from flask import Blueprint, request, jsonify
from models.product import Product
from db.config import db

product_bp = Blueprint('product_bp', __name__)

# GET /products → get all products
@product_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    result = []
    for p in products:
        result.append({
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "category": p.category,
            "price": p.price,
            "eco_score": p.eco_score,
            "stock": p.stock,
            "image_url": p.image_url
        })
    return jsonify(result), 200

# GET /products/<id> → get product by ID
@product_bp.route('/products/<int:id>', methods=['GET'])
def get_product_by_id(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product not found"}), 404

    return jsonify({
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "category": product.category,
        "price": product.price,
        "eco_score": product.eco_score,
        "stock": product.stock,
        "image_url": product.image_url
    }), 200

# POST /products → add new product (for now, open to all; later secure with JWT)
@product_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()

    try:
        new_product = Product(
            title=data['title'],
            description=data['description'],
            category=data['category'],
            price=data['price'],
            eco_score=data['eco_score'],
            stock=data['stock'],
            image_url=data['image_url']
        )

        db.session.add(new_product)
        db.session.commit()
        return jsonify({"message": "Product created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400
