export const Constant = {
    //  validation for forms
    
      // email validation regex
     
       // min length validation
       minLength: 3,
    
       // max length validation
       maxLength: 50,
    
    
    
       
     // validation messages
    
    REQUIRED: 'This field is required',

    MIN_LENGTH: (min: number) => `Minimum length is ${min}`,
    MAX_LENGTH: (max: number) => `Maximum length is ${max}`
    
    }