from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Artist, db

artist_routes = Blueprint('artists', __name__)

@artist_routes.route('/', methods=['GET'])
def get_artists():
  query = request.args.get('query')

  if query:
    artists = Artist.query.filter(Artist.name.ilike(f"%{query}%")).all()
  else:
    artists = Artist.query.all()

  formatted_artists = {artist.id: artist.to_dict() for artist in artists}
  return jsonify(formatted_artists)

@artist_routes.route('/<artist_id>', methods=['GET'])
def get_artist_by_id(artist_id):
  artist = Artist.query.get(artist_id)

  if artist:
    formatted_artist = artist.to_dict()
    return jsonify(formatted_artist)
  else:
    return jsonify({'message': 'Artist not found'}), 404
  
@artist_routes.route('/<artist_id>/favorite', methods=['GET'])
@login_required
def favorite_artist(artist_id):
  user = current_user
  artist = Artist.query.get(artist_id)
  
  if artist in user.favorites:
    return jsonify({'message': 'Artist is already in favorites'})

  user.favorites.append(artist)
  artist.favorited_by.append(user)

  db.session.commit()

  return jsonify(artist.to_dict())

@artist_routes.route('/<artist_id>/unfavorite', methods=['DELETE'])
@login_required
def unfavorite_artist(artist_id):
  user = current_user
  artist = Artist.query.get(artist_id)

  if artist in user.favorites:
    user.favorites.remove(artist)
    db.session.commit()
    return jsonify(artist.to_dict())
  else:
    return jsonify({'message': 'Artist is not in favorites'})