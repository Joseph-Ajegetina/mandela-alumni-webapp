export const Constant = {
    // Email and Phone Regex Validation
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegex: /^\d{10}$/,

    // Min & Max Length Validation
    minLength: 3,
    maxLength: 50,

    minPasswordLength: 5,
    maxPasswordLength: 20,

    minConfirmPasswordLength: 5,
    maxConfirmPasswordLength: 20,

    // Validation Messages
    REQUIRED: 'This field is required',
    EMAIL_INVALID: 'Please enter a valid email',
    MIN_LENGTH: (min: number) => `Minimum length is ${min}`,
    MAX_LENGTH: (max: number) => `Maximum length is ${max}`,
    MIN_PASSWORD_LENGTH: (min: number) => `Minimum password length is ${min}`,
    MAX_PASSWORD_LENGTH: (max: number) => `Maximum password length is ${max}`,
    MIN_CONFIRM_PASSWORD_LENGTH: (min: number) => `Minimum confirm password length is ${min}`,
    MAX_CONFIRM_PASSWORD_LENGTH: (max: number) => `Maximum confirm password length is ${max}`,
    PHONE_REGEX_INVALID: 'Please enter a valid phone number',
};
