from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Flask is running!"

@app.route('/your_endpoint', methods=['GET'])
def your_endpoint():
    return jsonify({"message": "Hello, your endpoint is working!"})

if __name__ == '__main__':
    app.run(debug=True)
