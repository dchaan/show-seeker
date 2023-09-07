from .db import db
from .user import user_favorites

class Artist(db.Model):
  __tablename__ = 'artists'

  id = db.Column(db.Integer, primary_key=True)
  api_id = db.Column(db.String(255), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))
  genre_api_id = db.Column(db.String(255), nullable=False)
  classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'))
  classification_api_id= db.Column(db.String(255), nullable=False)
  external_links = db.Column(db.Text)
  images = db.Column(db.Text)

  events = db.relationship('Event', back_populates='artist')
  genre = db.relationship('Genre', back_populates='artists')
  classification = db.relationship('Classification', back_populates='artists')
  favorited_by = db.relationship('User', secondary=user_favorites, back_populates='favorites')

  def to_dict(self):
    images = self.images.strip('{}').split(',') if self.images else []

    return {
      'id': self.id,
      'api_id': self.api_id,
      'name': self.name,
      'genre_api_id': self.genre_api_id,
      'genre': self.genre.to_dict() if self.genre else {},
      'classification_api_id': self.classification_api_id,
      'classification': self.classification.to_dict() if self.classification else {},
      'events': [event.to_dict() for event in self.events] if self.events else [],
      'favorited_by': [user.to_dict() for user in self.favorited_by] if self.favorited_by else [],
      'external_links': self.external_links if self.external_links else [],
      'images': images
    }