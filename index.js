const express = require('express')
//const cors = require('cors');
const app = express();
const path = require("path");
const apis = require("./apis/routes");

//use cors to allow cross origin resource sharing
/*app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);*/

app.use(express.json());

app.use(express.static(path.join(__dirname, "/antstack", "build")));
app.use('/apis', apis);


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});