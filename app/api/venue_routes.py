from flask import Blueprint, jsonify, request
from app.ticketmaster_api import get_venues_from_api, get_venues_by_id_from_api

venue_routes = Blueprint('venues', __name__)

@venue_routes.route('/', methods=['GET'])
def get_venues():
  venues = get_venues_from_api()
  return jsonify(venues)

@venue_routes.route('/<venue_id>', methods=['GET'])
def get_venues_by_id(venue_id):
  venue = get_venues_by_id_from_api(venue_id)

  if venue:
    return jsonify(venue)
  else:
    return jsonify({'message': 'Venue not found'}), 404