def format_event(event):
  artist = event['_embedded']['attractions'][0]
  venue = event['_embedded']['venues'][0]
  classification = event['classifications'][0]
  genre = classification['genre']
  
  event_data = {
    'id': event['id'],
    'name': event['name'],
    'start_time': event['dates']['start']['dateTime'],
    'promoter': event.get('promoter', {}).get('description', None),
    'price_range': event.get('priceRanges', [])[0],
    'seatmap': event.get('seatmap', {}).get('staticUrl', None),
    'accessibility': event.get('accessibility', {}).get('info', None),
    'ticket_limit': event.get('ticketLimit', {}).get('info', None),
    'url': event['url'],
    'images': [image['url'] for image in event.get('images', [])],
    'artist': artist['id'],
    'venue': venue['id'],
    'classification': classification['segment']['id'],
    'genre': genre['id']
  }
  
  return event_data

def format_artist(artist):
  artist_data = {
    'id': artist['id'],
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
