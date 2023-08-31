import requests
from .data_formatter import format_event, format_artist, format_classification, format_venue

TICKETMASTER_API_KEY = 'Ozt84Egp8jUR5jrMtj8Uo5S9FnN37ATE'
BASE_URL = 'https://app.ticketmaster.com/discovery/v2/'

def get_events_from_api(query=None, total_to_fetch=100, per_page=20):
  endpoint = f'{BASE_URL}events.json'
  params = {
    'apikey': TICKETMASTER_API_KEY,
    'keyword': query,
    'size': per_page
  }
  events = []
  count = 0
  page = 0

  while count < total_to_fetch:
    params['page'] = page
    response = requests.get(endpoint, params=params)
    data = response.json()
    events_on_page = data.get('_embedded', {}).get('events', [])

    if not events_on_page:
      break

    events.extend(events_on_page)
    count += len(events_on_page)
    page += 1

  return events

def get_event_by_id_from_api(event_id):
  endpoint = f'{BASE_URL}events/{event_id}.json'
  params = {
    'apikey': TICKETMASTER_API_KEY
  }
  response = requests.get(endpoint, params=params)
  data = response.json()
  return data

def get_events_by_venue_id_from_api(venue_id):
  endpoint = f'{BASE_URL}events.json'
  params = {
    'apikey': TICKETMASTER_API_KEY,
    'venueId': venue_id
  }
  response = requests.get(endpoint, params=params)
  data = response.json()
  events = data.get('_embedded', {}).get('events', [])
  return events

def get_artists_from_api(query=None, total_to_fetch=100, per_page=20):
  endpoint = f'{BASE_URL}attractions.json'
  params = {
    'apikey': TICKETMASTER_API_KEY,
    'keyword': query,
    'size': per_page
  }
  artists = []
  count = 0
  page = 0

  while count < total_to_fetch:
    params['page'] = page
    response = requests.get(endpoint, params=params)
    data = response.json()
    artists_on_page = data.get('_embedded', {}).get('attractions', [])

    if not artists_on_page:
      break

    artists.extend(artists_on_page)
    count += len(artists_on_page)
    page += 1

  return artists

def get_artist_by_id_from_api(artist_id):
  endpoint = f'{BASE_URL}attractions/{artist_id}.json'
  params = {
    'apikey': TICKETMASTER_API_KEY
  }
  response = requests.get(endpoint, params=params)
  data = response.json()
  return data

def get_classifications_from_api(query=None):
  endpoint = f'{BASE_URL}classifications.json'
  params = {
    'apikey': TICKETMASTER_API_KEY,
    'keyword': query
  }
  response = requests.get(endpoint, params=params)
  data = response.json()
  classifications = data.get('_embedded', {}).get('classifications', [])
  return classifications

def get_classifications_by_id_from_api(classification_id):
  endpoint = f'{BASE_URL}classifications/{classification_id}.json'
  params = {
    'apikey': TICKETMASTER_API_KEY
  }
  response = requests.get(endpoint, params=params)
  data = response.json()
  return data

def get_genres_from_classifications(classifications):
  genres = []

  for classification in classifications:
    classification_id = classification.get("id")
    classification_genres = classification.get("genres", [])
    
    for genre in classification_genres:
      genre["classification_id"] = classification_id
        
    genres.extend(classification_genres)
  
  return genres

def get_genre_by_id_from_classifications(genre_id, classifications):
  for classification in classifications:
    for genre in classification["genres"]:
      if genre["id"] == genre_id:
        return {
          "id": genre['id'],
          "name": genre["name"],
          "classification_id": classification["id"],
        }
      
  return None

def get_venues_from_api(query=None, total_to_fetch=100, per_page=20):
  endpoint = f'{BASE_URL}venues.json'
  params = {
    'apikey': TICKETMASTER_API_KEY,
    'keyword': query,
    'size': per_page
  }
  venues = []
  count = 0
  page = 0

  while count < total_to_fetch:
    params['page'] = page
    response = requests.get(endpoint, params=params)
    data = response.json()
    venues_on_page = data.get('_embedded', {}).get('venues', [])

    if not venues_on_page:
      break

    venues.extend(venues_on_page)
    count += len(venues_on_page)
    page += 1

  return venues

def get_venue_by_id_from_api(venue_id):
  endpoint = f'{BASE_URL}venues/{venue_id}.json'
  params = {
    'apikey': TICKETMASTER_API_KEY
  }
  response = requests.get(endpoint, params=params)
  data = response.json()
  return data
