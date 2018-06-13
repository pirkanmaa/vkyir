/* Controller for performing user related API requests */
var ImageController = {
    /* Get list of image files */
    getImages(id) {
        const url = `/images/${id}`;
        const request = new Request(url, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        return fetch(request);
    }
};

export default ImageController;