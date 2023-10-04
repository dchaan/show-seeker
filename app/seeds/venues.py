from sqlalchemy import text
from app.models import Venue, Event, db
from app.ticketmaster_api import get_venues_from_api, get_venue_by_id_from_api, format_venue

def seed_venues():
  venues = []
  events = Event.query.all()

  for event in events:
    venue = get_venue_by_id_from_api(event.venue_api_id)
    venues.append(format_venue(venue))

  for venue in venues:
    db.session.add(Venue(**venue))

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the venues table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_venues():
  db.session.execute(text('TRUNCATE venues RESTART IDENTITY CASCADE;'))
  db.session.commit()