declare var require;
declare var module;
declare var AppDb;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = [
    {id:1, name:"yuta", age: 31},
    {id:2, name:"puu", age:14},
    {id:3, name:"pico", age:30},
    {id:4, name:"gaa", age: 5},
  ]
  AppDb.User.findAll()
  .then(users=>{
    res.json(users)
  })
});

export default router;
