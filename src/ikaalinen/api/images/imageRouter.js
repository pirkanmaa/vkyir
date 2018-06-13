var express = require('express');
var imageRouter = express.Router();
var fs = require('fs');

/* Get images */

imageRouter.get('/:id', (req, res) => {
    let id = req.params.id;
    let images = [];

    if (typeof id === 'string') {
        fs.readdirSync(`${__dirname}/images/${id}`).forEach(file => images.push(file));
        res.status(200).send(images);
    } else {
        res.status(400).send({ message: 'Hakemaasi kohdetta ei löydy' });
    }

});

module.exports = imageRouter;