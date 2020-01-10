const Validator = require('validator');
//import isEmpty from './is-empty' used es6 brough error
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data){
    let errors = {};
                //if not empty data.name = data.name if empty ''
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    /**
        True if x is False
        False if x is True
        (Logically reverses the sense of x)
     */
    if(!Validator.isLength(data.name,{min:2, max: 30})){ 
        errors.name = 'Name must be between 2 and 30 characters'
    }
    
    //checks only empty string '' but what if they just skip over data.name for and they dont send anything so we have are is-empty.js abouve to check for us
    // so here( data.name = !isEmpty(data.name) ? data.name : '') we are passing empty sting if data.name is empty 
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required'
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }

     if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'password field is required'
    }

//if length is not do this is not between 6 and 30
    if(!Validator.isLength(data.password,{min:6, max: 30})){ 
        errors.password = 'Password must be at least 6 characters'
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'password field is required'
    }

//if not equal do this
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 =  ' Passwords must match'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}