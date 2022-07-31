const validationSchema = {
  nickname: {
    notEmpty: true,
    errorMessage:
      "You must provide correct field 'nickname'. Nickname must be grater than 1 letter or symbol",
  },
  password: {
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    errorMessage:
      "You must provide correct field 'password'. Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number and one symbol",
  },
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage:
      "You must provide correct field 'email'. A valid email address consists of an email prefix and an email domain, both in acceptable formats. The prefix appears to the left of the @ symbol",
  },
}

export default validationSchema
