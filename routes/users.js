const express = require('express');
const router = express.Router();
const passport = require('passport');
const database = require('../config/database');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/register', (req, res, next) => {
  let newUser = new User({
    name : req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: "Failed"});
    } else {
      res.json({success: true, msg: "New user added"});
    }
  });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err){
            res.json({success: false, msg: "There is an error, Try Again"});
            throw err;
        } if(!user){
            return res.json({success: false, msg: "User Not Found"});
        } 

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
               const token = jwt.sign(user, database.secret(), {
                   expiresIn: 30000000
               });

               res.json({
                   success: true,
                   msg: "You have logged in",
                   user: {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    token: "JWT "+ token
                   }
               });
            } else {
                res.json({success: false, msg: "Wrong Password"});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;