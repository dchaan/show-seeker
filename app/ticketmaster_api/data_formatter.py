import json
from app.models.artist import Artist
from app.models.classification import Classification
from app.models.genre import Genre
from app.models.venue import Venue

def format_event(event):
  attractions = event['_embedded'].get('attractions', [])
  artist_name = attractions[0]['name'] if attractions else None
  venue_name = event['_embedded']['venues'][0]['name']
  classification_name = event['classifications'][0]['segment']['name']
  genre_name = event['classifications'][0]['genre']['name']
  
  artist = Artist.query.filter_by(name=artist_name).first()
  venue = Venue.query.filter_by(name=venue_name).first()
  classification = Classification.query.filter_by(name=classification_name).first()
  genre = Genre.query.filter_by(name=genre_name).first()

  price_range = event.get('priceRanges', [])
  serialized_price_range = json.dumps(price_range) 

  event_data = {
    'name': event['name'],
    'start_time': event['dates']['start'].get('dateTime', None),
    'promoter': event.get('promoter', {}).get('description', None),
    'price_range': serialized_price_range,
    'seatmap': event.get('seatmap', {}).get('staticUrl', None),
    'accessibility': event.get('accessibility', {}).get('info', None),
    'ticket_limit': event.get('ticketLimit', {}).get('info', None),
    'url': event['url'],
    'images': [image['url'] for image in event.get('images', [])],
    'artist': artist if artist else None,
    'venue': venue if venue else None,
    'classification': classification if classification else None,
    'genre': genre if genre else None
  }
  return event_data

def format_artist(artist):
  artist_name = artist['name']
  genre_name = artist['classifications'][0]['genre']['name']
  
  genre = Genre.query.filter_by(name=genre_name).first()

  if not genre:
    print(f"Missing genre for artist: {artist_name}")

  artist_data = {
    'name': artist_name,
    'genre': genre if genre else None,
    'external_links': []
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
  classification_name = segment_data.get("name")

  classification_data = {
    "name": classification_name
  }
  return classification_data

def format_genre(genre):
  classification = Classification.query.filter_by(name=genre["classification_name"]).first()
  genre_data = {
    "name": genre["name"],
    "classification" : classification
  }
  return genre_data

def format_venue(venue, events):
  address = [
    venue.get('address', {}).get('line1', ''),
    venue.get('city', {}).get('name', ''),
    venue.get('state', {}).get('stateCode', ''),
    venue.get('postalCode', ''),
    venue.get('country', {}).get('countryCode', '')
  ]

  venue_data = {
    'name': venue['name'],
    'address': ', '.join(filter(None, address)),
    'box_office_info': venue['boxOfficeInfo']['openHoursDetail'] if 'boxOfficeInfo' in venue and 'openHoursDetail' in venue['boxOfficeInfo'] else '',
    'general_info': venue['generalInfo']['generalRule'] if 'generalInfo' in venue and 'generalRule' in venue['generalInfo'] else '',
    'images': [image['url'] for image in venue['images']] if 'images' in venue else [],
    'events': events
  }
  return venue_data
