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

    async getUserToDo( toDoId ) {
        
        const userToDo = await this.mongoDB.get(this.collection, toDoId);

        return userToDo || [];
    }

    async createUserToDo({ data }) {
        const { title, description, completed, userId } = data;
        const createdUserToDoId = await this.mongoDB.create(this.collection, {
            userId,
            title,
            description,
            completed,
        });

        return createdUserToDoId;
    }

    async updateUserToDo(toDoId, data ) {
      const updatedToDoId = await this.mongoDB.update(
          this.collection,
          toDoId,
          data
      );
      return updatedToDoId;
  }

    async deleteUserToDo({ toDoId }) {
        const deletedUserToDoId = await this.mongoDB.delete(
            this.collection,
            toDoId
        );

        return deletedUserToDoId;
    }
}

module.exports = UserToDosService;
