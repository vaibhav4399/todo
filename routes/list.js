const express = require('express');
const router = express.Router();
const User = require('../models/users');
const {ensureAuthenticaed} = require('../config/checkauth');
const PDFdocument = require('pdfkit');

router.get('/list',ensureAuthenticaed,(req,res) => {
  // console.log(req.session);
  User.findById( req.user.id)
  .then(user => {
    res.render('list' , {user :req.user.name,id : req.user.id,newitem : user.work})
  })
  .catch(err => console.log(err));
});

router.post('/list',ensureAuthenticaed,(req,res) => {
  User.findOneAndUpdate({email : req.user.email},{$push :{work : req.body.work}})
  .then((user) => {
    User.findById(user.id)
    .then(user => {
      res.render('list' , {user :req.user.name,id : req.user.id,newitem : user.work})
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err))
});

router.get('/logout',ensureAuthenticaed,(req,res) => {
  User.findOneAndUpdate({email:req.user.email},{$set :{work:[]}})
  .then(
    req.session.destroy(),
    req.logout(),
    res.redirect('/')
  )
  .catch(err => console.log(err))
});

router.get('/pdf',ensureAuthenticaed,(req,res) => {
  const doc = new PDFdocument();
  let filename = req.user.name;
  filename = encodeURIComponent(filename) + '.pdf';
  res.setHeader('Content-disposition','attachment;filename='+filename);
  res.setHeader('Content-type','application/pdf');
  User.findById( req.user.id)
  .then(user => {
    var d = new Date().toLocaleDateString();
    const str = user.name + " " + d;
    doc
    .fontSize(20)
    .text(str ,{align : 'center'})
    for(let j=0;j<user.work.length;j++)
    {
      const str = (j+1).toString()+" "+user.work[j];
      doc
      .fontSize(15)
      .text(str,{align : 'center'});
    }
    doc.pipe(res);
    doc.end();
  })
  .catch(err => console.log(err));
});

router.get('/clear',ensureAuthenticaed,(req,res) => {
  User.findOneAndUpdate({email:req.user.email},{$set :{work:[]}})
  .then((user) => {
    res.redirect(`/user/${user.id}/list`)
  })
  .catch(err => console.log(err))
});

module.exports = router;
