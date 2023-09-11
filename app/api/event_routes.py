from flask import Blueprint, jsonify, request
from app.models import Event

event_routes = Blueprint('events', __name__)

@event_routes.route('/', methods=['GET'])
def get_events():
  query = request.args.get('query')

  if query:
    events = Event.query.filter(Event.name.ilike(f'%{query}')).all()
  else:
    events = Event.query.all()

  formatted_events = {event.id: event.to_dict() for event in events}
  return jsonify(formatted_events)

@event_routes.route('/<event_id>', methods=['GET'])
def get_event_by_id(event_id):
  event = Event.query.filter_by(id=event_id).first()

  if event:
    formatted_event = event.to_dict()
    return jsonify(formatted_event)
  else:
    return jsonify({'message': 'Event not found'}), 404