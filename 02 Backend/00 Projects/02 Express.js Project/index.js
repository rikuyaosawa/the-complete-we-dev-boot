// Express.js Project

import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
  if (req.body["password"] === 'ILoveProgramming') {
    res.sendFile(__dirname + '/public/secret.html');
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
