from sqlalchemy import text
from app.models import Event, Artist, Classification, Genre, Venue, db
from app.ticketmaster_api import get_events_from_api, format_event, format_artist, get_artist_by_id_from_api

def seed_events():
  events = get_events_from_api(total_to_fetch=500)
  formatted_events = [format_event(event) for event in events]

  for formatted_event in formatted_events:
    event = Event(**formatted_event)
    db.session.add(event)

  db.session.commit()

def update_events_associations():
  events = Event.query.all()

  for event in events:
    artist = get_artist_by_id_from_api(event.artist_api_id)
    event.artist = artist

  # artist_dict = {artist.api_id: artist for artist in Artist.query.all()}
  # classification_dict = {classification.api_id: classification for classification in Classification.query.all()}
  # genre_dict = {genre.api_id: genre for genre in Genre.query.all()}
  # venue_dict = {venue.api_id: venue for venue in Venue.query.all()}

  # for event in events:
  #   artist_api_id = event.artist_api_id
  #   classification_api_id = event.classification_api_id
  #   genre_api_id = event.genre_api_id
  #   venue_api_id = event.venue_api_id

  #   if artist_api_id in artist_dict:
  #     event.artist = artist_dict[artist_api_id]

  #   if classification_api_id in classification_dict:
  #     event.classification = classification_dict[classification_api_id]

  #   if genre_api_id in genre_dict:
  #     event.genre = genre_dict[genre_api_id]

  #   if venue_api_id in venue_dict:
  #     event.venue = venue_dict[venue_api_id]

  db.session.commit()
  
# Uses a raw SQL query to TRUNCATE the events table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
  db.session.execute(text('TRUNCATE events RESTART IDENTITY CASCADE;'))
  db.session.commit()