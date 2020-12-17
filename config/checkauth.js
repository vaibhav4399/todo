module.exports = {
  ensureAuthenticaed : (req,res,next) => {
    if(req.isAuthenticated())
    {
      // console.log(req.isAuthenticated());
      return next();
    }
    else{
      // console.log(req.isAuthenticated());
      res.redirect('/')
    }
  }
}
