import express from 'express';

import lights from './lights.js'
import spotify from './spotify.js'

var app = express();

app.use('/lights', lights);
app.use('/spotify', spotify)

app.listen(9000);
console.log('Express started on port 9000');

