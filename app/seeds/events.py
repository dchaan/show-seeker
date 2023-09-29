from app.models import Event, db
from app.ticketmaster_api import get_events_from_api, format_event

def seed_events():
  events = get_events_from_api(total_to_fetch=500)
  formatted_events = [format_event(event) for event in events]

  for formatted_event in formatted_events:
    event = Event(**formatted_event)
    db.session.add(event)

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the events table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
  db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
  db.session.commit()