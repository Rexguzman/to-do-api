const joi = require('@hapi/joi');

const toDoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const toDoTitleSchema = joi.string().max(80);
const toDoDescriptionSchema = joi.string().max(300);

const createToDoSchema = {
  title: toDoTitleSchema.required(),
  description: toDoDescriptionSchema.required(),
};

const updateToDoSchema = {
  title: toDoTitleSchema,
  description: toDoDescriptionSchema,
};

module.exports = {
  toDoIdSchema,
  createToDoSchema,
  updateToDoSchema
};
