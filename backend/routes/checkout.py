from flask import Blueprint, request, jsonify

checkout_bp = Blueprint('checkout_bp', __name__)

@checkout_bp.route('/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    items = data.get('items', [])
    name = data.get('name')
    address = data.get('address')

    if not items or not name or not address:
        return jsonify({'message': 'Missing required fields'}), 400

    total = sum(item['price'] * item['quantity'] for item in items)
    
    return jsonify({
        'message': 'Order placed successfully!',
        'name': name,
        'total': total,
        'ecoImpact': len(items) * 2  # Dummy: 2 kg CO₂ saved/item
    }), 200
