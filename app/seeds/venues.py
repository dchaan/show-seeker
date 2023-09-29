from app.models import Venue, db
from app.ticketmaster_api import get_venues_from_api, format_venue

def seed_venues():
  venues = get_venues_from_api(total_to_fetch=500)
  formatted_venues = [format_venue(venue) for venue in venues]

  for formatted_venue in formatted_venues:
    venue = Venue(**formatted_venue)
    db.session.add(venue)

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the venues table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_venues():
  db.session.execute('TRUNCATE venues RESTART IDENTITY CASCADE;')
  db.session.commit()