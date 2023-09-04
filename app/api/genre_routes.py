from flask import Blueprint, jsonify
from app.ticketmaster_api import (
  get_genres_from_classifications, 
  get_classifications_from_api, 
  get_genre_by_id_from_classifications
)

genre_routes = Blueprint('genres', __name__)

@genre_routes.route('/', methods=['GET'])
def get_genres():
  classifications = get_classifications_from_api()
  genres = get_genres_from_classifications(classifications)
  return jsonify(genres)

@genre_routes.route('/<genre_id>', methods=['GET'])
def get_genre_by_id(genre_id):
  classifications = get_classifications_from_api()
  genre = get_genre_by_id_from_classifications(genre_id, classifications)
  return genre