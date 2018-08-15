var express = require('express');
var imageRouter = express.Router();
var gm = require('gm');
var fs = require('fs');

/* Get images */
imageRouter.get('/:id', (req, res) => {
    let id = req.params.id;
    let images = [];

    if (typeof id === 'string') {
        fs.readdirSync(`${__dirname}/images/${id}`).forEach(file => {
            // let path = `${file}`;
            /* let thumb = gm(path).thumb(250, 250, `${__dirname}/images/${id}/thumbs/${file}`, 75, function (err, data) {
                if (err) throw err;
                console.log("Done!");
            }); */
            images.push(file);
        });
        res.status(200).send(images);
    } else {
        res.status(400).send({ message: 'Hakemastasi kohteesta ei ole tietoja' });
    }

});

module.exports = imageRouter;