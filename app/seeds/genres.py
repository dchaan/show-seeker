from app.models import Genre, Classification, db
from app.ticketmaster_api import get_classifications_from_api ,get_genres_from_classifications

def seed_genres():
  classifications = get_classifications_from_api()
  genres = get_genres_from_classifications(classifications)

  for formatted_genre in genres:
    genre = Genre(**formatted_genre)
    db.session.add(genre)

  db.session.commit()

def update_genres_associations():
  genres = Genre.query.all()
  classification_dict = {classification.api_id: classification for classification in Classification.query.all()}

  for genre in genres:
    classification_api_id = genre.classification_api_id

    if classification_api_id in classification_dict:
      genre.classification = classification_dict[classification_api_id]

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the genres table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_genres():
  db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
  db.session.commit()