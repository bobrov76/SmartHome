const bcrypt = require('bcryptjs');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Reg users
exports.Reg = (req, res) => {
  // Validate request
  if (!req.body) { res.status(400).send({ message: "Content can not be empty!" }); return; }
  
   // Select login
   User.findOne({ where: { login: req.body.login,email:req.body.email }})
    .then(user => {
      if (user) { res.status(400).send({ message: "Content can not be empty!" }); return; } 
      else {
        // Create a User
        const user = {
          login: req.body.login,
          password: req.body.password,
          email: req.body.email,
          isAdmin: req.body.isAdmin ? req.body.isAdmin : false
        };
        //Hash password  
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) throw err;
            user.password = hash;  
            // Save User in the database
              User.create(user)
              .then(data => {
                res.send(data);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Tutorial."
                });
              });
          });
        });
      }    
    });    
};

//Login users
exports.Login = (req, res) => {
  User.findOne({ where: { login: req.body.login }})
  .then(user => {
    if (!user) { res.status(400).send({ message: "Пользователь не найден" }); }
    else
    {
      // Load hash from your password DB.
      bcrypt.compare(req.body.password, user.password, (err, isLogin) => {
        // res === true
        if(err) throw err;
       if(isLogin){
        const token = jwt.sign({ id: user.id }, 'vdvfsdfvdd', { expiresIn: 86400 }); // 24 hours        
        
        //Update JWT
        User.update({token : token}, {where: { id: user.id } }); 
        console.log(user.token);
        res.json({
          token: token,
          user:{
            id:user.id,
            login:user.login,
            email:user.email
           }
        });
      }
      else{res.status(400).send({ message: "Пользователь не найден" });}      
      });      
    }
  });    
};

//Exit (Ubdate token)
exports.findOne = (req, res) => { User.update({token : ""}, {where: { id: req.params.id } }); };

exports.Accaunt = (req, res) => {
    res.send("My accaunt");
};