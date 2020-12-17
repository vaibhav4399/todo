const express = require('express');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

const User = require('../models/users');

exports.registercontrol = (req,res) => {
  const {name,email,phone,password} = req.body;
  let errors = [];

//------------ Checking required fields ------------//
if (!name || !email || !phone || !password) {
    console.log(typeof phone);
    errors.push({ msg: 'Please enter all fields' });
}

//------------ Checking password length ------------//
if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
}

if (errors.length > 0) {
    res.render('register', {
        errors,
        name,
        email,
        password
    });
}
else{
  User.findOne({email : email})
  .then(async (user) => {
    if(user){
      errors.push({ msg: 'Email ID already registered' });
             res.render('register', {
                 errors,
                 name,
                 email,
                 password
             });
    }
    else
    {
      const newUser = new User({
        name,
        email,
        phone,
        password
      });

      await bcryptjs.hash(newUser.password , 10)
      .then(hash => {;
        newUser.password = hash;
      })
      .catch((err) => {
        console.log(err);
      })
      newUser.save();
      res.redirect('/auth/login');
    }
  })
  .catch((err) => {
    console.log(err);
  });
}
};


exports.logincontrol = (req,res,next) => {
  passport.authenticate('local',{
    successReturnToOrRedirect : `/user`,
    failureRedirect : '/auth/login',
     failureFlash: true
  })(req,res,next);
}
