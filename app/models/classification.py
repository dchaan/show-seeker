from .db import db

class Classification(db.Model):
  __tablename__ = 'classifications'

  id = db.Column(db.Integer, primary_key=True)
  api_id = db.Column(db.String(255), nullable=False)
  name = db.Column(db.String, nullable=False)

  artists = db.relationship('Artist', back_populates='classification')
  events = db.relationship('Event', back_populates='classification')
  genres = db.relationship('Genre', back_populates='classification')

  def to_dict(self):
    return {
      'id': self.id,
      'api_id': self.api_id,
      'name': self.name,
    }