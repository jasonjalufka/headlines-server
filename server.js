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
const port = process.env.OPENSHIFT_NODEJS_PORT || 5000;
const ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.post('/api/hello', (req, res) => {
  console.log(req.body);
  indico.batchSentiment(req.body)
    .then(sentiment => {
      res.send(sentiment);
      console.log('Sending sentiment: ' + sentiment);})
    .catch(error)
});

app.listen(port, () => console.log(`Listening on ${ip_address} port ${port}`));
