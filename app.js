const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const events = require('./routes/events');

const mongoURI = 'mongodb://koko:lama90@ds257372.mlab.com:57372/evnt';

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('connected to mlab'))
    .catch(err => console.log(err));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(res);
});

app.use('/api/events', events);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
