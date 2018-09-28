const express = require('express');
const router = express.Router();

const Event = require('../models/event');

router.get('/', (req, res) => {
  Event.find()
    .sort({ date: 1 })
    .then(events => res.json(events))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ success: true }))
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => event.remove().then(() => res.json({ success: true })))
    .catch(err => console.log(err));
});

module.exports = router;
