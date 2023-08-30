from flask import Blueprint, jsonify, request
from app.ticketmaster_api import get_classifications_from_api, get_classifications_by_id_from_api

classification_routes = Blueprint('classifications', __name__)

@classification_routes.route('/', methods=['GET'])
def get_classifications():
  query = request.args.get('query')
  classifications = get_classifications_from_api(query)
  return jsonify(classifications)

@classification_routes.route('/<classification_id>', methods=['GET'])
def get_classification_by_id(classification_id):
  classification = get_classifications_by_id_from_api(classification_id)

  if classification:
    return jsonify(classification)
  else:
    return jsonify({'message': 'Classification not found'}), 404