const express = require('express');
const router = express.Router();
const urlSchema = require('../model/urlModel');
const randomString = require('../common/randomString');

router.post('/isInUrl', (req, res, next) => {
    const longUrl = req.body.longUrl;
    urlSchema.findOne({ 'longUrl': longUrl })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json({
                'status': "err",
                'cause': err
            });
        });
});

router.post('/createShortUrl', (req, res, next) => {
    let shortUrl = randomString.createString(1, 8);
    const longUrl = req.body.longUrl;

    isNotInShortUrl(shortUrl)
    .then(()=>{
        const urlData = new urlSchema({
            'shortUrl': shortUrl,
            'longUrl': longUrl
        });
    
        urlData.save().then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json({
                'status': "err",
                'cause': err
            });
        });
    })
    .catch(()=>{
        shortUrl = randomString.createString(1, 8);
        isNotInShortUrl(shortUrl);
    });

    
});

function isNotInShortUrl(shortUrl) {
    return new Promise((resolve, reject) => {
        urlSchema.findOne({ 'shortUrl': shortUrl })
            .then((data) => {
                if (data == null) {
                    resolve();
                }else{
                    reject();
                }
            });
    });
}

module.exports = router;