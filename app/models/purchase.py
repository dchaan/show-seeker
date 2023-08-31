from .db import db

class Purchase(db.Model):
  __tablename__ = 'purchases'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
  purchase_date = db.Column(db.DateTime, nullable=False)

  user = db.relationship('User', backref='purchased_by')
  event = db.relationship('Event', backref='purchases')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'user': self.user,
      'event_id': self.event_id,
      'event': self.event,
      'purchase_date': self.purchase_date
    }