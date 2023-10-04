from flask.cli import AppGroup
from .artists import seed_artists, undo_artists
from .classifications import seed_classifications, undo_classifications
from .events import seed_events, undo_events, update_events_associations
from .genres import seed_genres, undo_genres
from .venues import seed_venues, undo_venues

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
  seed_classifications()
  seed_genres()
  seed_artists()
  seed_venues()
  seed_events()
  update_events_associations()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
  undo_events()
  undo_venues()
  undo_artists()
  undo_genres()
  undo_classifications()
