from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///functions.db'
db = SQLAlchemy(app)
CORS(app)

class Function(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    language = db.Column(db.String(100), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/api/functions', methods=['GET'])
def get_functions():
    functions = Function.query.all()
    results = [
        {
            'id': func.id,
            'name': func.name,
            'description': func.description,
            'language': func.language
        } for func in functions
    ]
    return jsonify(results)

@app.route('/api/functions/search', methods=['GET'])
def search_functions():
    query = request.args.get('query', '')
    language = request.args.get('language', '')
    functions = Function.query.filter(
        Function.description.ilike(f'%{query}%'),
        Function.language.ilike(f'%{language}%')
    ).all()
    results = [
        {
            'id': func.id,
            'name': func.name,
            'description': func.description,
            'language': func.language
        } for func in functions
    ]
    return jsonify(results)

@app.route('/api/functions', methods=['POST'])
def add_function():
    data = request.get_json()
    if 'name' not in data or 'description' not in data or 'language' not in data:
        return jsonify({'error': 'Bad Request', 'message': 'Missing name or description or language'}), 400

    new_function = Function(name=data['name'], description=data['description'], language=data['language'])
    db.session.add(new_function)
    db.session.commit()
    return jsonify({'message': 'Function added'}), 201

@app.route('/api/functions/<int:id>', methods=['DELETE'])
def delete_function(id):
    function = Function.query.get_or_404(id)
    db.session.delete(function)
    db.session.commit()
    return jsonify({'message': 'Function deleted'})

@app.route('/test')
def test():
    return 'Server is running'

if __name__ == '__main__':
    app.run(debug=True)
