from sqlalchemy import text
from app.models import Artist, Classification, Genre, db
from app.ticketmaster_api import get_artists_from_api, format_artist

def seed_artists():
  artists = get_artists_from_api(total_to_fetch=200)
  formatted_artists = [format_artist(artist) for artist in artists]

  for formatted_artist in formatted_artists:
    artist = Artist(**formatted_artist)
    db.session.add(artist)

  db.session.commit()

def update_artists_associations():
  artists = Artist.query.all()

  classification_dict = {classification.api_id: classification for classification in Classification.query.all()}
  genre_dict = {genre.api_id: genre for genre in Genre.query.all()}

  for artist in artists:
    classification_api_id = artist.classification_api_id
    genre_api_id = artist.genre_api_id

    if classification_api_id in classification_dict:
      artist.classification = classification_dict[classification_api_id]

    if genre_api_id in genre_dict:
      artist.genre = genre_dict[genre_api_id]

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the artists table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_artists():
  db.session.execute(text('TRUNCATE artists RESTART IDENTITY CASCADE;'))
  db.session.commit()