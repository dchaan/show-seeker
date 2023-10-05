from .db import db
from .user import user_favorites

class Artist(db.Model):
  __tablename__ = 'artists'

  id = db.Column(db.Integer, primary_key=True)
  api_id = db.Column(db.String(255))
  name = db.Column(db.String(255), nullable=False)
  genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))
  genre_api_id = db.Column(db.String(255))
  classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'))
  classification_api_id= db.Column(db.String(255))
  external_links = db.Column(db.Text)
  images = db.Column(db.Text)

  events = db.relationship('Event', back_populates='artist')
  genre = db.relationship('Genre', back_populates='artists')
  classification = db.relationship('Classification', back_populates='artists')
  favorited_by = db.relationship('User', secondary=user_favorites, back_populates='favorites')
  reviews = db.relationship('Review', back_populates='artist')

  def to_dict(self):
    images = self.images.strip('{}').split(',') if self.images else []

    return {
      'id': self.id,
      'name': self.name,
      'favorited_by': [user.to_dict() for user in self.favorited_by] if self.favorited_by else [],
      'external_links': self.external_links if self.external_links else [],
      'images': images,
      'classification': self.classification.to_dict() if self.classification else {},
      'genre': self.genre.to_dict() if self.genre else {},
      'reviews': [review.to_dict() for review in self.reviews] if self.reviews else []
    }