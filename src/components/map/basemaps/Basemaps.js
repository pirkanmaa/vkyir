import OSM from './OSM';
import CartoLight from './CartoLight';
import MapboxLight from './MapboxLight';
import MapboxDark from './MapboxDark';
import MapboxSatellite from './MapboxSatellite';

// CHOOSE YOUR DESTINY (BASEMAPS)!
let Basemaps = [OSM, CartoLight, MapboxLight, MapboxDark, MapboxSatellite];

// This converts the above basemap array into an array of objects with keys "layer, name, title" with values from map layers
function convert(array) {
    let target = [];
    for (let i = 0; i < array.length; i++) {
        target.push({
            layer: array[i],
            name: array[i].getProperties().name,
            title: array[i].getProperties().title
        });
    } return target;
}

export default Basemaps = convert(Basemaps);