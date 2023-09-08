from flask import Blueprint, jsonify, request
from app.ticketmaster_api import (
  get_venues_from_api, 
  get_venue_by_id_from_api,
  format_venue, get_events_by_venue_id_from_api, format_event
)
from app.models import Venue

venue_routes = Blueprint('venues', __name__)

@venue_routes.route('/', methods=['GET'])
def get_venues():
  query = request.args.get('query')

  if query:
    venues = Venue.query.filter(Venue.name.ilike(f"%{query}%")).all()
  else:
    venues = Venue.query.all()

  formatted_venues = {venue.id: venue.to_dict() for venue in venues}
  return jsonify(formatted_venues)

@venue_routes.route('/<venue_id>', methods=['GET'])
def get_venues_by_id(venue_id):
  venue = Venue.query.get(venue_id)

  if venue:
    formatted_venue = venue.to_dict()
    return jsonify(formatted_venue)
  else:
    return jsonify({'message': 'Artist not found'}), 404
