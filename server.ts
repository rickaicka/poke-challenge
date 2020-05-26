const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
const cors = require('cors');
 
app.use(express.static(`${__dirname}/dist/${nomeApp}`));
 
app.use(cors());
app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});
 
app.listen(process.env.PORT || 8080);
