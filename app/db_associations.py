from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Event, Artist, Genre, Venue, Classification

engine = create_engine('postgresql://postgres:password@localhost/showseeker')
Session = sessionmaker(bind=engine)
session = Session()

def update_event_associations(session):
  try:
    events = session.query(Event).all()

    artist_dict = {artist.api_id: artist for artist in session.query(Artist).all()}
    classification_dict = {classification.api_id: classification for classification in session.query(Classification).all()}
    genre_dict = {genre.api_id: genre for genre in session.query(Genre).all()}
    venue_dict = {venue.api_id: venue for venue in session.query(Venue).all()}

    for event in events:
      artist_api_id = event.artist_api_id
      classification_api_id = event.classification_api_id
      genre_api_id = event.genre_api_id
      venue_api_id = event.venue_api_id

      if artist_api_id in artist_dict:
        event.artist = artist_dict[artist_api_id]

      if classification_api_id in classification_dict:
        event.classification = classification_dict[classification_api_id]

      if genre_api_id in genre_dict:
        event.genre = genre_dict[genre_api_id]

      if venue_api_id in venue_dict:
        event.venue = venue_dict[venue_api_id]

    session.commit()
    print("Association updates successful")

  except Exception as e:
    session.rollback()
    print("Error updating events associations:", str(e))

def update_artist_associations(session):
  try:
    artists = session.query(Artist).all()

    classification_dict = {classification.api_id: classification for classification in session.query(Classification).all()}
    genre_dict = {genre.api_id: genre for genre in session.query(Genre).all()}

    for artist in artists:
      classification_api_id = artist.classification_api_id
      genre_api_id = artist.genre_api_id

      if classification_api_id in classification_dict:
        artist.classification = classification_dict[classification_api_id]

      if genre_api_id in genre_dict:
        artist.genre = genre_dict[genre_api_id]

    session.commit()
    print("Association updates for artists successful")

  except Exception as e:
    session.rollback()
    print("Error updating artist associations:", str(e))

def update_genre_associations(session):
  try:
    genres = session.query(Genre).all()
    classification_dict = {classification.api_id: classification for classification in session.query(Classification).all()}

    for genre in genres:
      classification_api_id = genre.classification_api_id

      if classification_api_id in classification_dict:
        genre.classification = classification_dict[classification_api_id]

    session.commit()
    print("Association updates for genres successful")

  except Exception as e:
    session.rollback()
    print("Error updating genre associations:", str(e))

try:
  update_event_associations(session)
  update_artist_associations(session)
  update_genre_associations(session)
except Exception as e:
  print("An error occurred during association updates:", str(e))
finally:
  session.close()