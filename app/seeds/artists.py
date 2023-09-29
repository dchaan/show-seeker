from app.models import Artist, db
from app.ticketmaster_api import get_artists_from_api, format_artist

def seed_artists():
  artists = get_artists_from_api(total_to_fetch=500)
  formatted_artists = [format_artist(artist) for artist in artists]

  for formatted_artist in formatted_artists:
    artist = Artist(**formatted_artist)
    db.session.add(artist)

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the artists table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_artists():
  db.session.execute('TRUNCATE artists RESTART IDENTITY CASCADE;')
  db.session.commit()