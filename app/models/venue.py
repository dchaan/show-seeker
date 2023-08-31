from .db import db

class Venue(db.Model):
  __tablename__ = 'venues'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  address = db.Column(db.String(255), nullable=False)
  box_office_info = db.Column(db.Text)
  general_info = db.Column(db.Text)
  images = db.Column(db.Text)
  
  events = db.relationship('Event', backref='venue_events', lazy=True)

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'address': self.address,
      'box_office_info': self.box_office_info,
      'general_info': self.general_info,
      'images': [image.to_obj() for image in self.images] if self.images else [],
      'events': [event.to_obj() for event in self.events] if self.events else []
    }