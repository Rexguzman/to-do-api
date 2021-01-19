const joi = require('@hapi/joi');

const userToDoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userToDoTitleSchema = joi.string().max(80);
const userToDoDescriptionSchema = joi.string().max(300);
const userToDoCompletedSchema = joi.boolean();

const createUserToDoSchema = {
    userId: userToDoIdSchema.required(),
    title: userToDoTitleSchema.required(),
    description: userToDoDescriptionSchema.required(),
    completed: userToDoCompletedSchema.required(),
};

const updateUserToDoSchema = {
  _id : userToDoIdSchema.required(),
  ...createUserToDoSchema
}

const completedUserToDoSchema = {
  _id : userToDoIdSchema.required(),
  userId : userToDoIdSchema.required(),
  completed : userToDoCompletedSchema.required(),
}

module.exports = {
    userToDoIdSchema,
    createUserToDoSchema,
    updateUserToDoSchema,
    completedUserToDoSchema
};
