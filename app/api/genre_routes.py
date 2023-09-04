from flask import Blueprint, jsonify, request
from app.ticketmaster_api import (
  get_genres_from_classifications, 
  get_classifications_from_api, 
  get_genre_by_id_from_classifications
)
from app.models import Genre

genre_routes = Blueprint('genres', __name__)

@genre_routes.route('/', methods=['GET'])
def get_genres():
  query = request.args.get('query')

  if query:
    genres = Genre.query.filter(Genre.name.ilike(f'%{query}%')).all()
  else:
    genres = Genre.query.all()

  formatted_genres = [
    {
      'id': genre.id,
      'name': genre.name,
      'classification_id': genre.classification_id
    }
    for genre in genres
  ]
  return jsonify(formatted_genres)

@genre_routes.route('/<genre_id>', methods=['GET'])
def get_genre_by_id(genre_id):
  genre = Genre.query.filter_by(id=genre_id).first()

  if genre:
    genre_data = {
        'id': genre.id,
        'name': genre.name,
        'classification_id': genre.classification_id
    }
    return jsonify(genre_data)
  else:
    return jsonify({'message': 'Genre not found'}), 404