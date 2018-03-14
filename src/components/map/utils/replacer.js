export default function replacer(key, value) {
  if (value.geometry) {
    var type;
    var rawType = value.type;
    var geometry = value.geometry;

    if (rawType === 1) {
      type = geometry.length === 1 ? 'Point' : 'MultiPoint';
    } else if (rawType === 2) {
      type = geometry.length === 1 ? 'LineString' : 'MultiLineString';
    } else if (rawType === 3) {
      type = geometry.length === 1 ? 'Polygon' : 'MultiPolygon';
    }

    return {
      'type': 'Feature',
      'geometry': {
        'type': type,
        'coordinates': geometry.length == 1 ? geometry : [geometry]
      },
      'properties': value.tags
    };
  } else {
    return value;
  }
};