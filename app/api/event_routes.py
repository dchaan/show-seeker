from flask import Blueprint, jsonify, request
from app.ticketmaster_api import get_events_from_api, get_event_by_id_from_api

event_routes = Blueprint('events', __name__)

@event_routes.route('/', methods=['GET'])
def get_events():
  query = request.args.get('query')
  events = get_events_from_api(query)
  return jsonify(events)

@event_routes.route('/<event_id>', methods=['GET'])
def get_event_by_id(event_id):
  event = get_event_by_id_from_api(event_id)
  
  if event:
    return jsonify(event)
  else:
    return jsonify({'message': 'Event not found'}), 404