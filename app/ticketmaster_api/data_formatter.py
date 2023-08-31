def format_event(event):
  attractions = event['_embedded'].get('attractions', [])
  artist = attractions[0] if attractions else None

  venue = event['_embedded']['venues'][0]
  classification = event['classifications'][0]
  genre = classification['genre']
  
  event_data = {
    'name': event['name'],
    'start_time': event['dates']['start'].get('dateTime', None),
    'promoter': event.get('promoter', {}).get('description', None),
    'price_range': event.get('priceRanges', []),
    'seatmap': event.get('seatmap', {}).get('staticUrl', None),
    'accessibility': event.get('accessibility', {}).get('info', None),
    'ticket_limit': event.get('ticketLimit', {}).get('info', None),
    'url': event['url'],
    'images': [image['url'] for image in event.get('images', [])],
    'artist': artist['id'] if artist else None,
    'venue': venue['id'],
    'classification': classification['segment']['id'],
    'genre': genre['id']
  }
  return event_data

def format_artist(artist):
  artist_data = {
    'name': artist['name'],
    'genre_id': artist['classifications'][0]['genre']['id'],
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
  return artist_data

def format_classification(classification):
  segment_data = classification.get("segment", {})
  classification_data = {
    "id": segment_data.get("id"),
    "name": segment_data.get("name"),
    "genres": [
      {"id": genre.get("id"), "name": genre.get("name")}
      for genre in segment_data.get("_embedded", {}).get("genres", [])
    ]
  }
  return classification_data

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
