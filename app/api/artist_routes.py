from flask import Blueprint, jsonify, request
from app.ticketmaster_api import get_artists_from_api, get_artist_by_id_from_api
from app.ticketmaster_api import format_artist

artist_routes = Blueprint('artists', __name__)

@artist_routes.route('/', methods=['GET'])
def get_artists():
  query = request.args.get('query')
  artists = get_artists_from_api(query)
  formatted_artists = []
  
  for artist in artists:
    formatted_artist = format_artist(artist)
    formatted_artists.append(formatted_artist)

  return jsonify(formatted_artists)

@artist_routes.route('/<artist_id>', methods=['GET'])
def get_artist_by_id(artist_id):
  artist = get_artist_by_id_from_api(artist_id)

  if artist:
    formatted_artist = format_artist(artist)
    return jsonify(formatted_artist)
  else:
    return jsonify({'message': 'Artist not found'}), 404