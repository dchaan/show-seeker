from app.ticketmaster_api import (
  get_events_from_api,
  get_artists_from_api,
  get_classifications_from_api,
  get_genres_from_classifications,
  get_venues_from_api,
  format_event,
  format_artist,
  format_classification,
  format_venue
)
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from models.event import Event
from models.artist import Artist
from models.classification import Classification
from models.genre import Genre
from models.venue import Venue

TICKETMASTER_API_KEY = 'Ozt84Egp8jUR5jrMtj8Uo5S9FnN37ATE'
BASE_URL = 'https://app.ticketmaster.com/discovery/v2/'

engine = create_engine('postgresql://postgres:password@localhost/showseeker')
Session = sessionmaker(bind=engine)
db_session = Session()

def migrate_events():
  try:
    events = get_events_from_api(total_to_fetch=200)
    formatted_events = [format_event(event) for event in events]

    with db_session.being():
      db_session.bulk_insert_mappings(Event, formatted_events)
      db_session.commit()
    print('Events migration successful')
  except SQLAlchemyError as e:
    db_session.rollback()
    print('Error during events migration', str(e))

def migrate_artists():
  try:
    artists = get_artists_from_api(total_to_fetch=200)
    formatted_artists = [format_artist(artist) for artist in artists]

    with db_session.begin():
      db_session.bulk_insert_mappings(Artist, formatted_artists)
      db_session.commit()
    print('Artists migration successful')
  except SQLAlchemyError as e:
    db_session.rollback()
    print('Error during artists migration', str(e))

def migrate_venues():
  try:
    venues = get_venues_from_api(total_to_fetch=200)
    formatted_venues = [format_venue(venue) for venue in venues]
    
    with db_session.begin():
      db_session.bulk_insert_mappings(Venue, formatted_venues)
      db_session.commit()
    print('Venues migration successful')
  except SQLAlchemyError as e:
    db_session.rollback()
    print('Error during venues migration', str(e))

def migrate_classifications():
  try:
    classifications = get_classifications_from_api()
    formatted_classifications = [format_classification(classification) for classification in classifications]

    with db_session.begin():
      db_session.bulk_insert_mappings(Classification, formatted_classifications)
      db_session.commit()
    print('Classifications migration successful')
  except SQLAlchemyError as e:
    db_session.rollback()
    print('Error during classifications migration', str(e))

def migrate_genres():
  classifications = get_classifications_from_api()
  try:
    genres = get_genres_from_classifications(classifications)

    with db_session.begin():
      db_session.bulk_insert_mappings(Genre, genres)
      db_session.commit()
    print('Genres migration successful')
  except SQLAlchemyError as e:
    db_session.rollback()
    print('Error during genres migration', str(e))

try:
  migrate_classifications()
  migrate_genres()
  migrate_artists()
  migrate_venues()
  migrate_events()
except Exception as e:
  print('An error occurred during migration:"', str(e))
  raise
finally:
  db_session.close()
