from flask import Blueprint, jsonify, request
from models import Classification
from ticketmaster_api import (
  get_classifications_from_api, 
  get_classifications_by_id_from_api, 
  format_classification
)

classification_routes = Blueprint('classifications', __name__)

@classification_routes.route('/', methods=['GET'])
def get_classifications():
  query = request.args.get('query')
  classifications = get_classifications_from_api(query)
  formatted_classifications = []

  for classification in classifications:
    formatted_classification = format_classification(classification)
    formatted_classifications.append(formatted_classification)

  return jsonify(formatted_classifications)

@classification_routes.route('/<classification_id>', methods=['GET'])
def get_classification_by_id(classification_id):
  classification = get_classifications_by_id_from_api(classification_id)

  if classification:
    formatted_classification = format_classification(classification)
    return jsonify(formatted_classification)
  else:
    return jsonify({'message': 'Classification not found'}), 404