from app.models import Genre, db
from app.ticketmaster_api import get_classifications_from_api ,get_genres_from_classifications

def seed_genres():
  classifications = get_classifications_from_api()
  genres = get_genres_from_classifications(classifications)

  for formatted_genre in genres:
    genre = Genre(**formatted_genre)
    db.session.add(genre)

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the genres table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_genres():
  db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
  db.session.commit()