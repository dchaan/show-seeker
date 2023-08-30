from app.models import Event

def get_event_by_id(event_id):
  event = Event.query.get(event_id)
  return event

def get_events_by_classification(classification_id):
  events = Event.query.filter_by(classification_id=classification_id).all()
  return events

def get_events_by_genre(genre_id):
  events = Event.query.filter_by(genre_id=genre_id).all()
  return events