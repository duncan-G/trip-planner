const { Marker } = require('mapbox-gl');

const iconURLs = {
  hotels: '/public/images/hotel_marker.png',
  restaurants: '/public/images/restaurant_marker.png',
  activities: '/public/images/location_marker.png'
};

const buildMarker = (type, coords) => {
  if (!iconURLs.hasOwnProperty(type)) {
    type = 'activities';
  }
  const markerEl = document.createElement('div');
  markerEl.style.backgroundSize = 'contain';
  markerEl.style.width = '32px';
  markerEl.style.height = '37px';
  markerEl.style.backgroundImage = `url(${iconURLs[type]})`;
  return new Marker(markerEl).setLngLat(coords);
};

module.exports = buildMarker;
