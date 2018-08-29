var express = require('express');
var router = express.Router();

var models = require('../models/models.js');

module.exports = function(passport) {
  // GET Login page
  router.get('/login', function(req, res) {
    res.render('login');
  });

  // POST Login page
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/documentPortal',
    failureRedirect: '/login'
  }));

  // GET registration page
  router.get('/signup', function(req, res) {
    res.render('signup');
  });

  // POST registration page
  var validateReq = function(userData) {
    if (userData.password !== userData.passwordRepeat) {
      return "Passwords don't match.";
    }

    if (!userData.email) {
      return "Please enter a email.";
    }

    if (!userData.password) {
      return "Please enter a password.";
    }
  };

  router.post('/signup', function(req, res) {
    // validation step
    var error = validateReq(req.body);
    if (error) {
      return res.render('signup', {
        error: error
      });
    }
    var u = new models.User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/signup');
        return;
      }
      console.log("Saved User: ", user);
      res.redirect('/login');
    });
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });


    return router;
}
