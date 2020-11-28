const joi = require('@hapi/joi');

const { toDoIdSchema } = require('./toDos');
const { userIdSchema } = require('./users');

const userToDoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserToDoSchema = {
  userId: userIdSchema,
  toDoId: toDoIdSchema
};

module.exports = {
  userToDoIdSchema,
  createUserToDoSchema
};