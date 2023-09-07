from flask import Blueprint, jsonify, request
from ticketmaster_api import (
  get_events_from_api,
  get_event_by_id_from_api,
  format_event
)
from models import Event
event_routes = Blueprint('events', __name__)

@event_routes.route('/', methods=['GET'])
def get_events():
  query = request.args.get('query')
  events = get_events_from_api(query)
  formatted_events = []

  for event in events:
    formatted_event = format_event(event)
    formatted_events.append(formatted_event)

  return jsonify(formatted_event)

@event_routes.route('/<event_id>', methods=['GET'])
def get_event_by_id(event_id):
  event = get_event_by_id_from_api(event_id)
  
  if event:
    formatted_event = format_event(event)
    return jsonify(formatted_event)
  else:
    return jsonify({'message': 'Event not found'}), 404