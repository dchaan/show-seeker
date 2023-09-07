from flask import Blueprint, jsonify, request
from app.models import Classification

classification_routes = Blueprint('classifications', __name__)

@classification_routes.route('/', methods=['GET'])
def get_classifications():
  query = request.args.get('query')

  if query:
    classifications = Classification.query.filter(Classification.name.ilike(f"%{query}%")).all()
  else:
    classifications = Classification.query.all()

  formatted_classifications = {classification.id: classification.to_dict() for classification in classifications}
  return jsonify(formatted_classifications)

@classification_routes.route('/<classification_id>', methods=['GET'])
def get_classification_by_id(classification_id):
  classification = Classification.query.get(classification_id)  # Query the database

  if classification:
    formatted_classification = classification.to_dict()
    return jsonify(formatted_classification)
  else:
    return jsonify({'message': 'Classification not found'}), 404