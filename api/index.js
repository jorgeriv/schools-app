const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(multer.none());

app.get('/', (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Express app running on port: ${port}`))

