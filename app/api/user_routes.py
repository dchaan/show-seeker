from flask import Blueprint
from flask_login import login_required
from app.models import User

user_routes = Blueprint('user', __name__)

@user_routes.route('/')
def users():
  users = User.query.all()
  return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
  user = User.query.get(id)
  return user.to_dict()

@user_routes.route('/<int:id>/favorites')
@login_required
def user_favorites(id):
  print(id)
  user = User.query.get(id)
  
  if not user:
    return {'error': 'User not found'}, 404

  return [favorite.to_dict() for favorite in user.favorites]