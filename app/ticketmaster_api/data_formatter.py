import json
from models.artist import Artist
from models.classification import Classification
from models.genre import Genre
from models.venue import Venue

def format_event(event):
  attractions = event['_embedded'].get('attractions', [])
  artist_api_id = attractions[0]['id']
  venue_api_id = event['_embedded']['venues'][0]['id']
  classification_api_id = event['classifications'][0]['segment']['id']
  genre_api_id = event['classifications'][0]['genre']['id']
  
  # artist = Artist.query.filter_by(name=artist_name).first()
  # venue = Venue.query.filter_by(name=venue_name).first()
  # classification = Classification.query.filter_by(name=classification_name).first()
  # genre = Genre.query.filter_by(name=genre_name).first()

  price_range = event.get('priceRanges', [])
  serialized_price_range = json.dumps(price_range) 

  event_data = {
    'name': event['name'],
    'api_id': event['id'],
    'start_time': event['dates']['start'].get('dateTime', None),
    'promoter': event.get('promoter', {}).get('description', None),
    'price_range': serialized_price_range,
    'seatmap': event.get('seatmap', {}).get('staticUrl', None),
    'accessibility': event.get('accessibility', {}).get('info', None),
    'ticket_limit': event.get('ticketLimit', {}).get('info', None),
    'url': event['url'],
    'images': [image['url'] for image in event.get('images', [])],
    'artist_api_id': artist_api_id,
    'venue_api_id': venue_api_id,
    'classification_api_id': classification_api_id,
    'genre_api_id': genre_api_id
  }
  return event_data

def format_artist(artist):
  artist_data = {
    'name': artist['name'],
    'api_id': artist['id'],
    'genre_api_id': artist['classifications'][0]['genre']['id'],
    'classification_api_id': artist['classifications'][0]['segment']['id'],
    'external_links': [],
    'images': [image['url'] for image in artist['images']] if 'images' in artist else []
  }
  
  links = artist.get('externalLinks', {})

  for platform, link_list in links.items():
    for link in link_list:
      if 'url' in link:
        artist_data['external_links'].append({
          'name': platform.capitalize(),
          'url': link['url'],
        })
  artist_data['external_links'] = json.dumps(artist_data['external_links'])
  return artist_data

def format_classification(classification):
  segment_data = classification.get("segment", {})
  name = segment_data.get("name")
  api_id = segment_data.get("id")

  classification_data = {
    "name": name,
    "api_id": api_id
  }
  return classification_data

def format_genre(genre):
  classification = Classification.query.filter_by(name=genre["classification"]).first()
  genre_data = {
    "name": genre["name"],
    "classification" : classification
  }
  return genre_data

def format_venue(venue):
  address = [
    venue.get('address', {}).get('line1', ''),
    venue.get('city', {}).get('name', ''),
    venue.get('state', {}).get('stateCode', ''),
    venue.get('postalCode', ''),
    venue.get('country', {}).get('countryCode', '')
  ]

  venue_data = {
    'name': venue['name'],
    'api_id': venue['id'],
    'address': ', '.join(filter(None, address)),
    'box_office_info': venue['boxOfficeInfo']['openHoursDetail'] if 'boxOfficeInfo' in venue and 'openHoursDetail' in venue['boxOfficeInfo'] else '',
    'general_info': venue['generalInfo']['generalRule'] if 'generalInfo' in venue and 'generalRule' in venue['generalInfo'] else '',
    'images': [image['url'] for image in venue['images']] if 'images' in venue else []
  }
  return venue_data
