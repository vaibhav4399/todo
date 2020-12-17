const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');

const User = require('../models/users');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({usernameField : 'email',passwordField : 'password'},(email,password,done) => {
      User.findOne({email : email})
      .then(async (user) =>{
      if(!user){
        console.log("user not found");
        return done(null,false,{message : 'This user is not registered'});
      }

      await bcryptjs.compare(password,user.password)
      .then((isMatch) => {
        if(isMatch) {
          return done(null,user);
        }
        else{
          return done(null,false,{message:"Password Incorrect"});
        }
      })
      .catch((err) => {
      console.log(err);;
      });
    }
    )
    .catch((err) => {
      console.log(err);
    });
    })
  );

  passport.serializeUser((user,done) => {
    done(null,user.id);
  });
  passport.deserializeUser((id,done) => {
    User.findById(id, function (err, user) {
           done(err, user);
       });
  });
}
