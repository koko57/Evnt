const express = require('express');
const router = express.Router();

const Event = require('../models/event');

router.get('/', (req, res) => {
  Event.find()
    .then(event => res.json(event))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  Event.create({ name: req.body.name })
    .then(event => res.json(event))
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => event.remove().then(() => res.json({ success: true })))
    .catch(err => console.log(err));
});

module.exports = router;
