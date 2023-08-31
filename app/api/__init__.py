from flask import Blueprint
from .auth_routes import auth_routes
from .user_routes import user_routes
from .event_routes import event_routes
from .artist_routes import artist_routes
from .classification_routes import classification_routes
from .genre_routes import genre_routes
from .venue_routes import venue_routes

api = Blueprint('api', __name__)

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(user_routes, url_prefix='/user')
api.register_blueprint(event_routes, url_prefix='/events')
api.register_blueprint(artist_routes, url_prefix='/artists')
api.register_blueprint(classification_routes, url_prefix='/classifications')
api.register_blueprint(genre_routes, url_prefix='/genres')
api.register_blueprint(venue_routes, url_prefix='/venues')


