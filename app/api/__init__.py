from flask import Blueprint
from .auth_routes import auth_routes
from .user_routes import user_routes
from .event_routes import event_routes

api = Blueprint('api', __name__)

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(user_routes, url_prefix='/user')
api.register_blueprint(event_routes, url_prefix='/events')
