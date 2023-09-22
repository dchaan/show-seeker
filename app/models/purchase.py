from .db import db

class Purchase(db.Model):
  __tablename__ = 'purchases'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
  purchase_date = db.Column(db.DateTime, nullable=False)
  quantity = db.Column(db.Integer, nullable=False)

  user = db.relationship('User', back_populates='purchases')
  event = db.relationship('Event', back_populates='purchases')

  def to_dict(self):
    return {
      'id': self.id,
      "user_id": self.user_id,
      'purchase_date': self.purchase_date,
      'quantity': self.quantity,
      'event': self.event.name,
      'event_date': self.event.start_time,
      'venue': self.event.venue.name if self.event.venue else None,
    }