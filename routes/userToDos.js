const express = require('express');
const passport = require('passport');

const UserToDosService = require('../services/userToDos');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const { toDoIdSchema } = require('../utils/schemas/toDos');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserToDoSchema } = require('../utils/schemas/userToDos');

//JWT Strategy
require('../utils/auth/strategies/jwt');

function userToDosApi(app) {
  const router = express.Router();
  app.use('/api/user-to-do', router);

  const userToDosService = new UserToDosService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-to-dos']),
    validationHandler({ userId: userIdSchema }, 'query'),
    async function (req, res, next) {
      const { userId } = req.query;

      try {
        const userToDos = await userToDosService.getUserToDos({ userId });

        res.status(200).json({
          data: userToDos,
          message: 'user to-dos listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-to-dos']),
    validationHandler(createUserToDoSchema),
    async function (req, res, next) {
      const { body: userToDo } = req;
      try {
        const createdUserToDoId = await userToDosService.createUserToDo({
          userToDo,
        });

        res.status(201).json({
          data: createdUserToDoId,
          message: 'user to-do created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userToDoId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:delete-to-dos']),
    validationHandler({ userToDoId: toDoIdSchema }, 'params'),
    async function (req, res, next) {
      const { userToDoId } = req.params;

      try {
        const deletedUserToDoId = await userToDosService.deleteUserToDo({
          userToDoId,
        });

        res.status(200).json({
          data: deletedUserToDoId,
          message: 'user to-do deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userToDosApi;
