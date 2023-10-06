from .db import db

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  rating = db.Column(db.Integer, nullable=False)
  title = db.Column(db.String(100), nullable=False)
  body = db.Column(db.String(1000), nullable=False)
  date = db.Column(db.DateTime, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)

  user = db.relationship("User", back_populates='reviews')
  artist = db.relationship("Artist", back_populates='reviews')

  def to_dict(self):
    return {
      'id': self.id,
      'rating': self.rating,
      'title': self.title,
      'body': self.body,
      'date': self.date,
      'user': self.user.to_dict()
    }