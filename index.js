const express = require('express');
const routes = require('./routes/routes');

const app = express();
const port = 3030;

app.use(express())
app.use(express.json());
app.use(express.static('src'))
app.use(express.static('uploads'))
app.use(express.static('images'))
app.use(express.urlencoded({extended: true}));
app.use(routes)

app.listen(port)