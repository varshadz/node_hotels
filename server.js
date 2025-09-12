const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send('welcome to our hotel!');
})
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log("Server is listening on 5000");
})