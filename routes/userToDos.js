const express = require('express');
const passport = require('passport');

const UserToDosService = require('../services/userToDos');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const { userToDoIdSchema ,createUserToDoSchema, updateUserToDoSchema, completedUserToDoSchema } = require('../utils/schemas/userToDos');

//JWT Strategy
require('../utils/auth/strategies/jwt');

function userToDosApi(app) {
    const router = express.Router();
    app.use('/api/user-to-dos', router);

    const userToDosService = new UserToDosService();

    router.get(
        '/:userId',
        //passport.authenticate('jwt', { session: false }),
        validationHandler({ userId: userToDoIdSchema }),
        async (req, res, next) => {
            try {
                const { userId } = req.params;
                const userToDos = await userToDosService.getUserToDos({
                    userId,
                });

                res.status(200).json({
                    data: userToDos,
                    message: 'to-dos listed',
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.post(
        '/',
        //passport.authenticate('jwt', { session: false }),
        validationHandler(createUserToDoSchema),
        async (req, res, next) => {
            try {
                const data = req.body;
                const createUserToDo = await userToDosService.createUserToDo({
                    data,
                });

                res.status(201).json({
                    toDoId: createUserToDo,
                    message: 'to-do created',
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.put(
        '/',
        //passport.authenticate('jwt', { session: false }),
        validationHandler(updateUserToDoSchema),
        async (req, res, next) => {
            try {
                const id = req.body._id;
                const data = {
                    userId : req.body.userId,
                    title: req.body.title,
                    description: req.body.description,
                    completed: req.body.completed,
                };
                const updatedUserToDosId = await userToDosService.updateUserToDo(
                    id,
                    data
                );

                res.status(200).json({
                    _id: updatedUserToDosId,
                    ...data,
                    message: 'to-do updated',
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.put(
        '/completed',
        //passport.authenticate('jwt', { session: false }),
        validationHandler(completedUserToDoSchema),
        async (req, res, next) => {
            try {
                const id = req.body._id;
                const data = {
                    userId : req.body.userId,
                    completed: req.body.completed,
                };
                const updatedUserToDos = await userToDosService.updateUserToDo(
                    id,
                    data
                );

                res.status(200).json({
                    _id: updatedUserToDos,
                    ...data,
                    message: 'to-do updated',
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.delete(
        '/:toDoId',
        //passport.authenticate('jwt', { session: false }),
        validationHandler({ toDoId: userToDoIdSchema }, 'params'),
        async (req, res) => {
            try {
                const { toDoId } = req.params;
                const deletedUserToDos = await userToDosService.deleteUserToDo({
                    toDoId,
                });

                res.status(200).json({
                    data: deletedUserToDos,
                    message: 'to-do deleted',
                });
            } catch (err) {
                next(err);
            }
        }
    );
}
module.exports = userToDosApi;
