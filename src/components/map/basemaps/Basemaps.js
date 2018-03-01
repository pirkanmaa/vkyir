import OSM from './OSM';
import CartoLight from './CartoLight';
import MapboxLight from './MapboxLight';
import MapboxDark from './MapboxDark';
import MapboxSatellite from './MapboxSatellite';

const Basemaps = {
    "OSM": OSM,
    "CartoLight": CartoLight,
    "MapboxLight": MapboxLight,
    "MapboxDark": MapboxDark,
    "MapboxSatellite": MapboxSatellite
};

export default Basemaps;