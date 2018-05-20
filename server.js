const express = require('express');
const indico = require('indico.io');
const bodyParser = require('body-parser')
indico.apiKey = '49091132f1ab23857831196e1eedec3b';

var settings = {"api_key": indico.apiKey};
var response = res => console.log(res);
var error = err => console.log(err);
let analyzedData;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://jasonjalufka.me/headlines/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
};
const port = 80;

app.get('/api/hi', (req, res) => {
  console.log('Hello world!');
  res.json('You did it!');
});

app.post('/api/hello', (req, res) => {
  console.log(req.body);
  indico.batchSentiment(req.body)
    .then(sentiment => {
      res.send(sentiment);
      console.log('Sending sentiment: ' + sentiment);})
    .catch(error)
});

app.listen(port, () => console.log(`Listening on port ${port}`));
