from .db import db

class Classification(db.Model):
  __tablename__ = 'classifications'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  artists = db.relationship('Classification', back_populates='classification')
  events = db.relationship('Event', back_populates='classification')
  genres = db.relationship('Genre', back_populates='clasification')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'artists': [artist.to_dict() for artist in self.artists] if self.artists else [],
      'events': [event.to_dict() for event in self.events] if self.events else [],
      'genres': [genre.to_dict() for genre in self.genres] if self.genres else []
    }