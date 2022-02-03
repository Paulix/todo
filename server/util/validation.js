const { isEmpty, isEmail, equals } = require("validator").default;

module.exports.validateSignupData = (data) => {
    // username email password confirmPassword
    let errors = {};

    // validate username
    if (!data.username || isEmpty(data.username)) {
        errors.username = "Must not be empty";
    }

    // validate email
    if (!data.email || isEmpty(data.email)) {
        errors.email = "Must not be empty";
    } else if (!isEmail(data.email)) {
        errors.email = "Must be a valid email";
    }

    // validate password
    if (!data.password || isEmpty(data.password)) {
        errors.password = "Must not be empty";
    }

    // validate confirm password
    if (!data.confirmPassword || isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Must not be empty";
    }

    // check if passwords match
    if (
        data.password &&
        data.confirmPassword &&
        !equals(data.password, data.confirmPassword)
    ) {
        errors.confirmPassword = "Passwords must match";
    }

    // return errors and valid
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    };
};

module.exports.validateSigninData = (data) => {
    // email password
    let errors = {};

    // validate email
    if (!data.email || isEmpty(data.email)) {
        errors.email = "Must not be empty";
    } else if (!isEmail(data.email)) {
        errors.email = "Must be a valid email";
    }

    // validate password
    if (!data.password || isEmpty(data.password)) {
        errors.password = "Must not be empty";
    }

    // return errors and valid
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    };
};
