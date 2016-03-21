declare var require
var config = require("../../config/config")

export var Sequelize = require('sequelize');
export var sequelize = new Sequelize(null, null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: config.DB.DEFAULT.PATH
});

export var User = sequelize.define('user', {
  google_id  : Sequelize.STRING,
  google_json: Sequelize.TEXT,
  username   : Sequelize.STRING,
  email      : Sequelize.STRING,
})


// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     username: "Yuta Nakamura",
//     email: "yuta.nakamura.i7@gmail.com",
//   });
// });
