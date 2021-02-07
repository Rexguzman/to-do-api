const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/); //ID de mongo

const userSchema = {
  name: joi.string().max(100).required(),
  email: joi.string().min(6).required().email(),
  password: joi.string().required(),
};

const createUserSchema = {
  ...userSchema,
  verifiedEmail: joi.boolean().required()
};

const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: joi.string().required()
};

module.exports = {
    userIdSchema,
    createUserSchema,
    createProviderUserSchema
}
