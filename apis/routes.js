const express = require('express');
const router = express.Router();

const urlMetadata = require('url-metadata');
const dnsServer = require("dns");

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
router.route("/findDNS").post(async (req, res) => {
    try {
        let reqBody = req.body;
        console.log(reqBody);
        if (!("url" in req.body || "dns" in req.body))
            res.send({
                message: "Query's format is not correct"
            });
        else {
            let url = req.body.url;
            let dns = req.body.dns;
            try {
                let txts = dnsServer.resolveTxt(url, (err, dnsRecords)=>{
                    console.log(dnsRecords);
                    for(let record of dnsRecords){
                        if(record.indexOf(dns)!=-1){
                            res.send({message: record});
                            return;
                        }
                    }
                    res.send({message: "This DNS Txt Record is not present in the domain"})
                });
            } catch (err) {
                console.log(err.message);
                res.send({
                    message: "There is an error in fetching dns txt tags for the given url"
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