const express = require('express')
const app = express();
const path = require("path");
const apis = require("./apis/routes");

app.use(express.static(path.join(__dirname, "/antstack", "build")));
app.use('', apis);


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});