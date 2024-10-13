const router = require('express').Router();
let Contact = require('../models/Contact');

// Handle POST request to save contact form data
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const query = req.body.query;

  const newContact = new Contact({
    name,
    email,
    query,
  });

  newContact.save()
    .then(() => res.json('Contact added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
