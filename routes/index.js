const express = require('express');
const router = express.Router();
const {ensureAuthenticaed} = require('../config/checkauth')

router.get('/',(req,res) => {
  res.render('index');
})

router.get('/user',ensureAuthenticaed,(req,res) => {
  res.redirect(`/user/${req.user.id}/list`);
})

module.exports = router;
