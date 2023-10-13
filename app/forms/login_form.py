from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
  # Checking if user exists
  email = field.data
  user = User.query.filter(User.email == email).first()
  if not user:
    raise ValidationError('We can’t find an account with this email address. Please try a different email.')


def password_matches(form, field):
  # Checking if password matches
  password = field.data
  email = form.data['email']
  user = User.query.filter(User.email == email).first()

  if user:
    if not user.check_password(password):
      raise ValidationError('Password was incorrect. Please try again.')


class LoginForm(FlaskForm):
  email = StringField('email', validators=[DataRequired(), user_exists])
  password = StringField('password', validators=[DataRequired(), password_matches])