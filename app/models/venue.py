from .db import db

class Venue(db.Model):
  __tablename__ = 'venues'

  id = db.Column(db.Integer, primary_key=True)
  api_id = db.Column(db.String(255), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  address = db.Column(db.String(255), nullable=False)
  box_office_info = db.Column(db.Text)
  general_info = db.Column(db.Text)
  images = db.Column(db.Text)
  
  events = db.relationship('Event', back_populates='venue')

  def to_dict(self):
    images = self.images.strip('{}').split(',') if self.images else []

    return {
      'id': self.id,
      'name': self.name,
      'address': self.address,
      'box_office_info': self.box_office_info,
      'general_info': self.general_info,
      'images': images
    }