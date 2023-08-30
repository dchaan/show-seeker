import requests
from .data_formatter import format_event

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
  