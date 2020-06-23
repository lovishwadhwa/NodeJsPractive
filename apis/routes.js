const express = require('express');
const router  = express.Router(); 

router.route("/apis/hello").post((req, res) => {
    console.log(req);
    res.send({message: "hello"});
})


module.exports = router;