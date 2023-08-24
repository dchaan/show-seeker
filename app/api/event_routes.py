from flask import Blueprint, jsonify

event_routes = Blueprint('events', __name__)

@event_routes.route('')
def events():
  return 'Hello'