from .db import db

class Event(db.Model):
  __tablename__ = 'events'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'), nullable=False)
  genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=False)
  artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
  venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'), nullable=False)
  start_time = db.Column(db.DateTime)
  promoter = db.Column(db.String(255))
  price_range = db.Column(db.String(255))
  seatmap = db.Column(db.String(255))
  accessibility = db.Column(db.Text)
  ticket_limit = db.Column(db.String(500))
  url = db.Column(db.String(255))
  images = db.Column(db.Text)
  
  artist = db.relationship('Artist', backref='event_artist')
  classification = db.relationship('Classification', backref='event_classification')
  genre = db.relationship('Genre', backref='event_genre')
  venue = db.relationship('Venue', backref='event_venue')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'classification_id': self.classification_id,
      'genre_id': self.genre_id,
      'artist_id': self.artist_id,
      'venue_id': self.venue_id,
      'start_time': self.start_time,
      'promoter': self.promoter,
      'price_range': self.price_range,
      'seatmap': self.seatmap,
      'accessibility': self.accessibility,
      'ticket_limit': self.ticket_limit,
      'url': self.url,
      'images': [image.to_obj() for image in self.images] if self.images else []
    }


