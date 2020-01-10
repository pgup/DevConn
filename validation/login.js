const Validator = require('validator');
//import isEmpty from './is-empty' used es6 brough error
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data){
    let errors = {};
    
    // if empty it will come in as null or undefined so we have to do the following 
    //if not empty data.name = data.name if empty ''
    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


  if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }
    
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }


    if(Validator.isEmpty(data.password)){
        errors.password = 'password field is required'
    }




    return{
        errors,
        isValid: isEmpty(errors)
    }
}