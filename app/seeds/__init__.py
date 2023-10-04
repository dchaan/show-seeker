from flask.cli import AppGroup
from .artists import seed_artists, undo_artists, update_artists_associations
from .classifications import seed_classifications, undo_classifications
from .events import seed_events, undo_events, update_events_associations
from .genres import seed_genres, undo_genres, update_genres_associations
from .venues import seed_venues, undo_venues

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
  seed_classifications()
  seed_genres()
  seed_events()
  seed_artists()
  seed_venues()
  update_events_associations()
  update_artists_associations()
  update_genres_associations()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
  undo_venues()
  undo_artists()
  undo_events()
  undo_genres()
  undo_classifications()
