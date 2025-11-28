from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory data
products = [
    {
        "id": 1,
        "name": "Product 1",
        "price": 19.99
    },
    {
        "id": 2,
        "name": "Product 2",
        "price": 29.99
    },
    {
        "id": 3,
        "name": "Product 3",
        "price": 39.99
    }
]
cart = []
orders = []

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/api/cart', methods=['GET', 'POST'])
def handle_cart():
    if request.method == 'GET':
        return jsonify(cart)
    elif request.method == 'POST':
        item = request.json
        cart.append(item)
        return jsonify({"message": "Item added to cart"}), 201

@app.route('/api/orders', methods=['POST'])
def create_order():
    order = request.json
    order['id'] = len(orders) + 1
    orders.append(order)
    return jsonify(order), 201

if __name__ == '__main__':
    app.run(port=4000, debug=True)
