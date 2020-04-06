module.exports = app => {
  const users = require("../controllers/users.controller");
  const auth = require("../controllers/auth.controller");

  const passport = require("passport");
  const jwt = require("jsonwebtoken");
  var router = require("express").Router();

  
  router.post("/reg", auth.Reg);// Reg routs  
  router.post("/auth", auth.Login);// Auth routs 
  router.get("/auth/:id", auth.findOne);// Exit accaunt
  router.get("/accaunt", passport.authenticate('jwt',{session:false}) , auth.Accaunt);// My accaunt

  

  // Create a new Tutorial
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);

  // Update a Tutorial with id
  router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Create a new Tutorial
  router.delete("/", users.deleteAll);

  app.use('/api', router);
};
