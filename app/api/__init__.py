from flask import Blueprint
from .auth_routes import auth_routes
from .user_routes import user_routes

api = Blueprint('api', __name__)

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(user_routes, url_prefix='/user')
