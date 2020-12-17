const express = require('express');
const router = express.Router();
const authcontrol = require('../controllers/authcontrol');

router.get('/register',(req,res) => {
  res.render('register');
});
router.post('/register',authcontrol.registercontrol);

router.get('/login',(req,res) => {
  res.render('login');
});

router.post('/login',authcontrol.logincontrol);

// router.get('/')


module.exports = router;
