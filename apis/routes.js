const express = require('express');
const router = express.Router();

const urlMetadata = require('url-metadata');

router.route("/findMeta").post(async (req, res) => {
    try {
        let reqBody = req.body;
        console.log(reqBody);
        if (!("url" in req.body || "meta" in req.body))
            res.send({
                message: "Query's format is not correct"
            });
        else {
            let url = req.body.url;
            let meta = req.body.meta;
            try {
                let metaData = await urlMetadata(url);
                console.log(metaData);
                if (meta in metaData) {
                    res.send({
                        message: metaData[meta]
                    });
                } else {
                    res.send({
                        message: "This meta tag is not present in the url"
                    });
                }
            } catch (err) {
                res.send({
                    message: "There is an error in fetching meta tags for the given url"
                });
            }
        }
    } catch (err) {
        res.send({
            message: "There is an error in the user inputs"
        })
    }
})


module.exports = router;