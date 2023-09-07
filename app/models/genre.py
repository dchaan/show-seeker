from .db import db

class Genre(db.Model):
  __tablename__ = 'genres'

  id = db.Column(db.Integer, primary_key=True)
  api_id = db.Column(db.String(255), nullable=False)
  name = db.Column(db.String, nullable=False)
  classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'))
  classification_api_id = db.Column(db.String(255), nullable=False)

  classification = db.relationship('Classification', back_populates='genres')
  events = db.relationship('Event', back_populates='genre')
  artists = db.relationship('Artist', back_populates='genre')

  def to_dict(self):
    return {
      'id': self.id,
      'api_id': self.api_id,
      'name': self.name,
      'classification_api_id': self.classification_api_id,
      'classification': self.classification.to_dict() if self.classification else {},
      'events': [event.to_dict() for event in self.events] if self.events else [],
      'artists': [artist.to_dict() for artist in self.artists] if self.artists else []
    }