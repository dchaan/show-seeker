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
  venues = get_venues_from_api(query)
  formatted_venues = []

  for venue in venues:
    formatted_venue = format_venue(venue)
    formatted_venues.append(formatted_venue)

  return formatted_venues

@venue_routes.route('/<venue_id>', methods=['GET'])
def get_venues_by_id(venue_id):
  venue = get_venue_by_id_from_api(venue_id)

  if not venue:
    return jsonify({"error": "Venue not found"}), 404
  
  formatted_venue = format_venue(venue)
  return formatted_venue

# @venue_routes.route('/<venue_id>/events', methods=['GET'])
# def get_events_by_venue_id(venue_id):
#   events = get_events_by_venue_id_from_api(venue_id)
#   formatted_events = []

#   for event in events:
#     formatted_event = format_event(event)
#     formatted_events.append(formatted_event)
  
#   return formatted_events