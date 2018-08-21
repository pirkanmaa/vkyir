import Kuntarajat from './Kuntarajat';
import Rusle from './Rusle';
import Vesty from './Vesty';
import Pintavesieko from './Pintavesieko';

/* Choose basemaps */
let Layers = [Rusle,Pintavesieko,Kuntarajat,Vesty];

/* This converts the above basemap array into an array of objects with keys "layer, name, title" with values from map layers */
function convert(array) {
    return array.reduce((acc, layer) => {

        acc.push({
            layer: layer,
            name: layer.getProperties().name,
            title: layer.getProperties().title,
            visibility: layer.getProperties().visible
        }); return acc;
    }, [])
}

export default Layers = convert(Layers);