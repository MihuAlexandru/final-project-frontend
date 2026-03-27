import validator from "validator";

export const validatePassword = (password) => {
  const isStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  return isStrong && password.length <= 128;
};

export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword && confirmPassword !== "";
};

export const validateEmail = (email) => {
  return validator.isEmail(email);
};

export const validatePhone = (phone) => {
  return validator.isMobilePhone(phone, "any");
};
