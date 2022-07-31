const authSchema = {
  password: {
    notEmpty: true,
    errorMessage: 'Password field is empty.',
  },
  email: {
    notEmpty: true,
    errorMessage: 'Email field is empty.',
  },
}

export default authSchema
