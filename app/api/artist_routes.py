from flask import Blueprint, jsonify, request
from app.ticketmaster_api import get_artists_from_api, get_artist_by_id_from_api

artist_routes = Blueprint('artists', __name__)

@artist_routes.route('/', methods=['GET'])
def get_artists():
  query = request.args.get('query')
  artists = get_artists_from_api(query)
  return jsonify(artists)

@artist_routes.route('/<artist_id>', methods=['GET'])
def get_artist_by_id(artist_id):
  artist = get_artist_by_id_from_api(artist_id)

  if artist:
    return jsonify(artist)
  else:
    return jsonify({'message': 'Artist not found'}), 404