var express = require('express');
var imageRouter = express.Router();
var fs = require('fs');
var path = require('path');
var thumb = require('node-thumbnail').thumb;

/* Get images */
imageRouter.get('/:id', (req, res) => {
    let id = req.params.id;
    let images = [];
    let dirname = `${__dirname}/../../../public/images`;

    if (typeof id === 'string') {
        let files = fs.readdirSync(`${dirname}/${id}`);
        files.forEach(file => {

            if (!file.includes('thumb_') && files.indexOf(`thumb_${file}`) === -1) {

                thumb({
                    source: `${dirname}/${id}/${file}`,
                    destination: `${dirname}/${id}`,
                    prefix: 'thumb_',
                    suffix: '',
                    concurrency: 2,
                    skip: true,
                    overwrite: false,
                    width: 160
                }).then(() => {
                    images.push(file);
                    images.push(`thumb_${file}`)
                }).catch(err => {
                    console.log('Error', err.toString());
                });
            }

            else {
                images.push(file);
            }
        });

        res.status(200).send(images);

    } else {
        res.status(400).send({ message: 'Hakemastasi kohteesta ei ole tietoja' });
    }

});

module.exports = imageRouter;