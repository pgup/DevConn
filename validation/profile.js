const Validator = require('validator');
//import isEmpty from './is-empty' used es6 brough error
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data){
    let errors = {};
                
    // if empty it will come in as null or undefined so we have to do the following 
    //if not empty data.name = data.name if empty ''
    

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    //is not between 2 and 40 lenth than do this
    if(!Validator.isLength(data.handle,{min: 2, max:40})){
        errors.handle = 'Handle needs to between 2 and 4 characters';
    }
    
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }

    if(Validator.isEmpty(data.status)){
        errors.status = 'Status field is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
      }
    


    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }


    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }


    //isvalid if errors are empty
    return{
        errors,
        isValid: isEmpty(errors)
    }
}