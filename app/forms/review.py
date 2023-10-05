from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
  rating = IntegerField('rating', validator=[DataRequired('must submit rating')])

  title = StringField('title', validators=[DataRequired('must submit a title'), Length(1, 100)])

  body = StringField('body', validators=[DataRequired('must submit a body'), Length(1, 1000)])

  artist_id = IntegerField('artist_id', validators=[DataRequired('must have an artist associated with review')])