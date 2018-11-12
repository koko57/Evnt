const express = require('express');
const router = express.Router();

const Event = require('../models/event');
const User = require('../models/user');

router.get('/:user', (req, res) => {
  Event.find({ user: req.params.user })
    .sort({ date: 1 })
    .then(events => res.json(events))
    .catch(err => console.log(err));
});

router.post('/:user', (req, res) => {
  // const user = User.findById(req.params.user);
  Event.create(req.body)
    .then(event => {
      User.findByIdAndUpdate(req.params.user,
        {$push: {events: event}}
    ).then(data => {
        console.log(data);
    })
      return res.json(event);
    })
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
