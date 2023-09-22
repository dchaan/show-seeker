from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import datetime
from app.models import User, Purchase, Event, db

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

@user_routes.route('/<int:id>/favorites', methods=['GET'], endpoint='user_favorites_endpoint')
@login_required
def user_favorites(id):
  user = User.query.get(id)
  
  if not user:
    return {'error': 'User not found'}, 404

  return [favorite.to_dict() for favorite in user.favorites]

@user_routes.route('/<int:id>/purchases', methods=['GET'])
@login_required
def user_purchases(id):
  purchases = Purchase.query.filter_by(user_id=id).all()
  
  return [purchase.to_dict() for purchase in purchases]

@user_routes.route('/<int:user_id>/purchases/<int:purchase_id>', methods=['GET'])
def get_purchase_by_ids(user_id, purchase_id):
  purchase = Purchase.query.filter_by(id=purchase_id, user_id=user_id).first()

  if purchase is not None:
    return purchase.to_dict()
  else:
    return jsonify({'error': 'Purchase not found'}), 404
  
@user_routes.route('/<int:user_id>/purchases', methods=['POST'])
@login_required
def create_purchase(user_id):
  data = request.get_json()
  event_id = data.get('event_id')
  quantity = data.get('quantity')
  date = datetime.now()
  event = Event.query.get(event_id)

  if event is not None:
    purchase = Purchase(user_id=user_id, event_id=event_id, quantity=quantity, purchase_date=date)
    db.session.add(purchase)
    db.session.commit()

    return purchase.to_dict()

  else:
    return jsonify({'error': 'Event not found'}), 404
  
@user_routes.route('/<int:user_id>/purchases/<int:purchase_id>', methods=['DELETE'])
@login_required
def delete_purchase(user_id, purchase_id):
  purchase = Purchase.query.filter_by(id=purchase_id, user_id=user_id).first()

  if purchase is None:
    return jsonify({'error': 'Purchase not found'}), 404

  db.session.delete(purchase)
  db.session.commit()

  return jsonify({'message': 'Purchase deleted successfully'})