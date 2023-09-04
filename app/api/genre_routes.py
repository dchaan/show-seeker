from flask import Blueprint, jsonify, request
from app.models import Genre

genre_routes = Blueprint('genres', __name__)

@genre_routes.route('/', methods=['GET'])
def get_genres():
  query = request.args.get('query')

  if query:
    genres = Genre.query.filter(Genre.name.ilike(f'%{query}%')).all()
  else:
    genres = Genre.query.all()

  formatted_genres = [genre.to_dict() for genre in genres]
  return jsonify(formatted_genres)

@genre_routes.route('/<genre_id>', methods=['GET'])
def get_genre_by_id(genre_id):
  genre = Genre.query.filter_by(id=genre_id).first()

  if genre:
    formatted_genre = genre.to_dict()
    return jsonify(formatted_genre)
  else:
    return jsonify({'message': 'Genre not found'}), 404