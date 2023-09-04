from flask import Blueprint, jsonify, request
from app.models import Artist

artist_routes = Blueprint('artists', __name__)

@artist_routes.route('/', methods=['GET'])
def get_artists():
  query = request.args.get('query')    

  if query:
    artists = Artist.query.filter(Artist.name.ilike(f"%{query}%")).all()
  else:
    artists = Artist.query.all()

  formatted_artists = [artist.to_dict() for artist in artists]
  return jsonify(formatted_artists)

@artist_routes.route('/<artist_id>', methods=['GET'])
def get_artist_by_id(artist_id):
  artist = Artist.query.filter_by(id=artist_id).first()

  if artist:
    formatted_artist = artist.to_dict()
    return jsonify(formatted_artist)
  else:
    return jsonify({'message': 'Artist not found'}), 404