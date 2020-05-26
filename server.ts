const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname + '/dist/poke-challenge'));

app.get('/*', cors(),function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/poke-challenge/index.html'));
});

app.listen(process.env.PORT || 3000);