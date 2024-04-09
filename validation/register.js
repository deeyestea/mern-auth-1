import validator from "validator";
import isEmpty from "is-empty";

const validateRegisterInput = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is requried";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is requried";
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is requried";
    }

    if (!validator.isLength(data.password, { min: 6, max: 12 })) {
        errors.password = "Password length must be 6 to 12 characters";
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateRegisterInput;