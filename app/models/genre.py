from .db import db

class Genre(db.Model):
  __tablename__ = 'genres'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'))

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'classification_id': self.classification_id
    }
  