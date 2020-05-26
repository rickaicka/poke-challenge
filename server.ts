const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
const cors = require('cors');
 
app.use(cors());
app.options('*', cors())
app.use(express.static(`${__dirname}/dist/${nomeApp}`)); 
app.get('/*', cors(), function(req,res) {

    if(req.url === '/') {
      res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
    }
    else {
      res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/` + req.url))
    }
  
  });
 
app.listen(process.env.PORT || 8080);
