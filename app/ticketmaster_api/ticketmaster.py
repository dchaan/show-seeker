import requests
from .data_formatter import format_event, format_artist, format_classification

TICKETMASTER_API_KEY = 'Ozt84Egp8jUR5jrMtj8Uo5S9FnN37ATE'
BASE_URL = 'https://app.ticketmaster.com/discovery/v2/'

def get_events_from_api(query=None):
  endpoint = f'{BASE_URL}events.json'
  params = {
    'apikey': TICKETMASTER_API_KEY,
    'keyword': query
  }

  response = requests.get(endpoint, params=params)
  data = response.json()
  events = data.get('_embedded', {}).get('events', [])

  formatted_events = []

  for event in events:
    formatted_event = format_event(event)
    formatted_events.append(formatted_event)

  return formatted_events

def get_event_by_id_from_api(event_id):
  endpoint = f'{BASE_URL}events/{event_id}.json'
  params = {
    'apikey': TICKETMASTER_API_KEY
  }
  
  response = requests.get(endpoint, params=params)
  data = response.json()
  formatted_event = format_event(data)
  return formatted_event
  
def get_artists_from_api(query=None):
  endpoint = f'{BASE_URL}attractions.json'
  params = {
    'apikey': TICKETMASTER_API_KEY,
    'keyword': query
  }

  response = requests.get(endpoint, params=params)
  data = response.json()
  artists = data.get('_embedded', {}).get('attractions', [])

  formatted_artists = []

  for artist in artists:
    formatted_artist = format_artist(artist)
    formatted_artists.append(formatted_artist)

  return formatted_artists

def get_artist_by_id_from_api(artist_id):
  endpoint = f'{BASE_URL}attractions/{artist_id}.json'
  params = {
    'apikey': TICKETMASTER_API_KEY
  }

  response = requests.get(endpoint, params=params)
  data = response.json()
  formatted_artist = format_artist(data)
  return formatted_artist

def get_classifications_from_api(query=None):
  endpoint = f'{BASE_URL}classifications.json'
  params = {
    'apikey': TICKETMASTER_API_KEY,
    'keyword': query
  }

  response = requests.get(endpoint, params=params)
  data = response.json()
  classifications = data.get('_embedded', {}).get('classifications', [])

  formatted_classifications = []
  
  for classification in classifications:
    formatted_classification = format_classification(classification)
    formatted_classifications.append(formatted_classification)

  return formatted_classifications

def get_classifications_by_id_from_api(classification_id):
  endpoint = f'{BASE_URL}classifications/{classification_id}.json'
  params = {
    'apikey': TICKETMASTER_API_KEY
  }

  response = requests.get(endpoint, params=params)
  data = response.json()
  formatted_classification = format_classification(data)
  return formatted_classification