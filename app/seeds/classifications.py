from sqlalchemy import text
from app.models import Classification, db
from app.ticketmaster_api import get_classifications_from_api, format_classification

def seed_classifications():
  classifications = get_classifications_from_api()
  formatted_classifications = [format_classification(classification) for classification in classifications]

  for formatted_classification in formatted_classifications:
    classification = Classification(**formatted_classification)
    db.session.add(classification)

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the classifications table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_classifications():
  db.session.execute(text('TRUNCATE classifications RESTART IDENTITY CASCADE;'))
  db.session.commit()