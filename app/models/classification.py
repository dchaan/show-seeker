from .db import db

class Classification(db.Model):
  __tablename__ = 'classifications'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  genres = db.relationship('Genre', backref='classification_genre', lazy=True)

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'genres': [genre.to_obj for genre in self.genres] if self.genres else []
    }