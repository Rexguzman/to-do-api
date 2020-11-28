const express = require('express');
const passport = require('passport');
const ToDosService = require('../services/toDos');

const {
  toDoIdSchema,
  createToDoSchema,
  updateToDoSchema,
} = require('../utils/schemas/toDos');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

//JWT Strategy
require('../utils/auth/strategies/jwt');

const toDosApi = (app) => {
  const router = express.Router();
  app.use('/api/to-dos', router);

  const toDosService = new ToDosService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:to-dos']),
    async (req, res, next) => {
      const { tags } = req.query;

      try {
        const toDos = await toDosService.gettoDos({ tags });
        res.status(200).json({
          data: toDos,
          message: 'to-dos listed',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:toDoId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:to-dos']),
    validationHandler({ toDoId: toDoIdSchema }, 'params'),
    async (req, res, next) => {
      const { toDoId } = req.params;

      try {
        const toDos = await toDosService.getToDo({ toDoId });

        res.status(200).json({
          data: toDos,
          message: 'to-dos retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:to-dos']),
    validationHandler(createToDoSchema),
    async (req, res, next) => {
      const { body: toDo } = req;

      try {
        const createToDoId = await toDosService.createToDo({ toDo });

        res.status(201).json({
          data: createToDoId,
          message: 'to-do create',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:toDoId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:to-dos']),
    validationHandler({ toDoId: toDoIdSchema }, 'params'),
    validationHandler(updateToDoSchema),
    async (req, res, next) => {
      const { body: toDo } = req;
      const { toDoId } = req.params;

      try {
        const updatedToDos = await toDosService.updateToDo({
          toDoId,
          toDo,
        });

        res.status(200).json({
          data: updatedToDos,
          message: 'to-do update',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:toDoId',
    validationHandler({ toDoId: toDoIdSchema }, 'params'),
    scopesValidationHandler(['delete:toDos']),
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { toDoId } = req.params;

      try {
        const deletedtoDos = await toDosService.deleteToDo({ toDoId });

        res.status(200).json({
          data: deletedtoDos,
          message: 'to-do deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
};

module.exports = toDosApi;
