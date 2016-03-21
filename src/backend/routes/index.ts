declare var require;
declare var module;
declare var AppDb;

var express = require('express');
var router = express.Router();

var loginCheck = function(req, res, next) {
  if (req.session.user) {
    AppDb.User.findOne({where:{id:req.session.user.id}})
    .then(user=>{
      // セッション内のユーザーIDが実在すればOKとする
      if (user) next()
      else next(new Error("user not found."))
    }) // TODO: error handling.
  } else res.redirect('/login')
};
router.get('/', loginCheck, function(req, res, next) {
  res.render('index', { title: 'Express', user: req.session.user });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
router.get('/logout', function(req, res, next) {
  req.session.user = null
  res.redirect('../')
});


(function() {
  // Google認証セクション
  var config = require("../config/config")
  var passport = require("passport")
  var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
  var GOOGLE_CLIENT_ID = config.PASSWORD.GOOGLE_CLIENT_ID;
  var GOOGLE_CLIENT_SECRET = config.PASSWORD.GOOGLE_CLIENT_SECRET;
  passport.use(new GoogleStrategy({
      clientID:     GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://mac.local.com:3000/auth/google/callback",
      passReqToCallback : true
    },
    function(req, accessToken, refreshToken, profile, done) {
      console.log( {req} );
      AppDb.User.findOrCreate({
        where: {
          google_id: profile.id,
        },
        defaults: {
          google_id: profile.id,
          google_json: JSON.stringify(profile),
          username: profile.displayName, 
          email: profile.email,
        }
      }).then(user=>{
        // Googleログイン後、セッションに格納
        var user_data = user[0]
        req.session.user = {
          id      : user_data.id,
          email   : user_data.email,
          username: user_data.username,
        }
        done(null, user)
      }).catch(err=>{
        done(err)
      })
    }
  ));
  router.get('/auth/google',
    passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
  ));
  router.get('/auth/google/callback',
    passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/login'
  }));
})()

export default router;
