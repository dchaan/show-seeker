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
    'artist': artist['name'],
    'venue': venue['name'],
    'classification': classification['segment']['name'],
    'genre': genre['name']
  }
  
  return event_data
