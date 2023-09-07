from .db import db

class Event(db.Model):
  __tablename__ = 'events'

  id = db.Column(db.Integer, primary_key=True)
  api_id = db.Column(db.String(255), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'))
  classification_api_id = db.Column(db.String(255), nullable=False)
  genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))
  genre_api_id = db.Column(db.String(255), nullable=False)
  artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
  artist_api_id = db.Column(db.String(255), nullable=False)
  venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))
  venue_api_id = db.Column(db.String(255), nullable=False)
  start_time = db.Column(db.DateTime)
  promoter = db.Column(db.String(255))
  price_range = db.Column(db.String(255))
  seatmap = db.Column(db.String(255))
  accessibility = db.Column(db.Text)
  ticket_limit = db.Column(db.String(500))
  url = db.Column(db.String(255))
  images = db.Column(db.Text)
  
  artist = db.relationship('Artist', back_populates='events')
  classification = db.relationship('Classification', back_populates='events')
  genre = db.relationship('Genre', back_populates='events')
  venue = db.relationship('Venue', back_populates='events')
  purchases = db.relationship('Purchase', back_populates='event')

  def to_dict(self):
    images = self.images.strip('{}').split(',') if self.images else []

    return {
      'id': self.id,
      'api_id': self.api_id,
      'name': self.name,
      'classification_api_id': self.classification_api_id,
      'classification': self.classification.to_dict() if self.classification else {},
      'genre_api_id': self.genre_api_id,
      'genre': self.genre.to_dict() if self.genre else {},
      'artist_api_id': self.artist_api_id,
      'artist': self.artist.to_dict() if self.artist else {},
      'venue_api_id': self.venue_api_id,
      'venue': self.venue.to_dict() if self.venue else {},
      'start_time': self.start_time,
      'promoter': self.promoter,
      'price_range': self.price_range,
      'seatmap': self.seatmap,
      'accessibility': self.accessibility,
      'ticket_limit': self.ticket_limit,
      'url': self.url,
      'images': images,
      'purchases': [purchase.to_dict() for purchase in self.purchases] if self.purchases else []
    }


