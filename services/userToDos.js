const MongoLib = require('../lib/mongo');

class UserToDosService {
  constructor() {
    this.collection = 'user-to-dos';
    this.mongoDB = new MongoLib();
  }

  async getUserToDos({ userId }) {
    const query = userId && { userId };
    const userToDos = await this.mongoDB.getAll(this.collection, query);

    return userToDos || [];
  }

  async createUserToDo({ userToDo }) {
    const createdUserToDoId = await this.mongoDB.create(
      this.collection,
      userToDo
    );

    return createdUserToDoId;
  }

  async deleteUserToDo({ userToDoId }) {
    const deletedUserToDoId = await this.mongoDB.delete(
      this.collection,
      userToDoId
    );

    return deletedUserToDoId;
  }
}

module.exports = UserToDosService;