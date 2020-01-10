const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const passport = require('passport')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
 
//Load user model
const User = require('../../models/User')


//@route GET api/users/test
//@desc tests users route
//@access Public
router.get('/test', (req, res) => {
    res.json({msg: "user Works"})
});

//@route GET api/users/register
//@desc Register user
//@access Public

router.post('/register', (req, res) => {
    //console.log("req.body =>", req.body) req.body => [Object: null prototype] {  name: 'Brad Traversy',  email: 'trinity591823@aol.com',  password: '12' }

    const {errors, isValid} = validateRegisterInput(req.body) //req.body everything sent to this route, name, email, etc

    //check validation if  false(which means error object is not empty return which means there is an error) than (!false)=> (true) so do the flowing
    //if not valid do the following
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then( user => {

           if(user){
            errors.email = 'Email is already registered'
            return res.status(400).json(errors);
            //before we had const {errors, isValid} \\ this => return and obect return {email:''}res.status(400).json({email: 'Email is already registered'});
           } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', 
                    r: 'pg', 
                    d: 'mm'
                })

               const newUser = new User({
                   name: req.body.name,
                   email: req.body.email,
                   avatar,
                   password: req.body.password,
                   data: req.body.data
               });

               bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
               })
           }
            
        })

});


//@route POST api/users/login
//@desc Login User / Returning JWT Token
//@access Public
//find user email
    // the user are going to send a form that has an e-mail and a password.
router.post('/login', (req,res)=>{

    const {errors, isValid} = validateLoginInput(req.body) //req.body everything sent to this route, name, email, etc

    //check validation if  false(which means error object is not empty return which means there is an error) than (!false)=> (true) so do the flowing
    //if not valid do the following
    if(!isValid){
        return res.status(400).json(errors);
    }


    //using body parcer to extract the email and bassword
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user =>{ // the findone will reture a user with the User.js schema we created
        //then catch https://mongoosejs.com/docs/queries.html
        //if no user return send states 404 not found

    //check for user
        if(!user){
            errors.email = 'user not found'
            return res.status(404).json(errors);
        }

        //check if the passsword upove(req.body.password;) is the same as the password from user(we got from findone)
    //check password
        
        bcrypt.compare(password, user.password).then(isMatch=>{
            //once an user passes  get back a token using jwt.
            // And then once they get that token they can send that along to access a protected route.

            const payload = {id: user.id, name: user.name, avatar: user.avatar}// create jwt payload

            if(isMatch){
              jwt.sign( 
                  payload,
                  keys.secretOrKey,
                  {expiresIn:3600},
                  (err, token)=>{
                    if(err) throw err;
                      res.json({
                          success:true,
                          token: 'Bearer ' + token
                      })
                  }
              )  
            } else {
                errors.password = 'Password incorrect'
                return res.status(400).json(errors)
            }
        })
    })

})

//@route GET api/users/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req,res) =>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
});

module.exports = router; 