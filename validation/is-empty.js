const isEmpty = (value) =>
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
   


// validation is empty ony check fo rempty string her we check for undefined null ect

module.exports = isEmpty