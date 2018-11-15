import { Itinerary } from './intinerary';
const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker.js');

mapboxgl.accessToken =
  'pk.eyJ1IjoiZHVuY2FuZyIsImEiOiJjam9nZThxZXQwZWE4M3FwaTBzMzh0MnBnIn0.WNKXpHy_VXi3UqZAN6XjQw';

const fullstackCoords = [-74.009, 40.705];
// slo -120.6596, 35.2828
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: 'map',
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activities', fullstackCoords);
marker.addTo(map);

const itinerary = new Itinerary();
itinerary.initPage();
