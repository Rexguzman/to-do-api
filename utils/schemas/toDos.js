const joi = require('@hapi/joi');

const toDoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const toDoTitleSchema = joi.string().max(80);
const toDoDescriptionSchema = joi.string().max(300);
const toDoCompletedSchema = joi.boolean();

const createToDoSchema = {
  title: toDoTitleSchema.required(),
  description: toDoDescriptionSchema.required(),
  completed: toDoCompletedSchema.required(),
};

const updateToDoSchema = {
  title: toDoTitleSchema,
  description: toDoDescriptionSchema,
  completed: toDoCompletedSchema.required(),
};

module.exports = {
  toDoIdSchema,
  createToDoSchema,
  updateToDoSchema
};
