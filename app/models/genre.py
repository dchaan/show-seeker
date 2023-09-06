from .db import db

class Genre(db.Model):
  __tablename__ = 'genres'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'))

  classification = db.relationship('Classification', back_populates='genres')
  events = db.relationship('Event', back_populates='genre')
  artists = db.relationship('Artist', back_populates='genre')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'classification_id': self.classification_id,
      'classification': self.classification.to_dict() if self.classification else {},
      'events': [event.to_dict() for event in self.events] if self.events else [],
      'artists': [artist.to_dict() for artist in self.artists] if self.artists else []
    }