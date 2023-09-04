from .db import db
from .user import user_favorites

class Artist(db.Model):
  __tablename__ = 'artists'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))
  external_links = db.Column(db.Text)

  events = db.relationship('Event', backref='artist_events', lazy=True)
  genre = db.relationship('Genre', backref='artist_genre')
  favorited_by = db.relationship('User', secondary=user_favorites, backref='users_favorited', lazy=True)

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'genre_id': self.genre_id,
      'genre': self.genre.to_obj() if self.genre else [],
      'events': [event.to_obj() for event in self.events] if self.events else [],
      'favorited_by': [user.to_obj() for user in self.favorited_by] if self.favorited_by else [],
      'external_links': self.external_links if self.external_links else []
    }