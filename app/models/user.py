from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

user_favorites = db.Table(
  'user_favorites',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('artist_id', db.Integer, db.ForeignKey('artists.id'), primary_key=True)
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(120), nullable=False)
  last_name = db.Column(db.String(120), nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  hashed_password = db.Column(db.String(120), nullable=False)

  favorites = db.relationship('Artist', secondary=user_favorites, backref='favorited_by', lazy=True)
  purchases = db.relationship('Purchase', backref='user', lazy=True)

  @property
  def password(self):
    return self.hashed_password
  
  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)
  
  def to_dict(self):
    return {
      'id': self.id,
      'first_name': self.first_name,
      'last_name': self.last_name,
      'email': self.email,
      'favorites': [favorite.to_obj() for favorite in self.favorites] if self.favorites else [],
      'purchases': [purchase.to_obj() for purchase in self.purchases] if self.purchases else []
    }

