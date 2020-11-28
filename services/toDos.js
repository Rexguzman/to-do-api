const MongoLib = require('../lib/mongo');

class ToDosService {
    constructor() {
        this.collection = 'to_do_api';
        this.mongoDB = new MongoLib();
    }

    async getToDo({ toDoId }) {
        const toDo = await this.mongoDB.get(this.collection, toDoId);
        return toDo || {};
    }

    async createToDo({ toDo }) {
        const createToDoId = await this.mongoDB.create(this.collection, toDo);
        return createToDoId;
    }

    async updateToDo({ toDoId, toDo } = {}) {
        const updatedToDoId = await this.mongoDB.update(
            this.collection,
            toDoId,
            toDo
        );
        return updatedToDoId;
    }

    async deleteToDo({ toDoId }) {
        const deletedToDoId = await this.mongoDB.delete(
            this.collection,
            toDoId
        );
        return deletedToDoId;
    }
}

module.exports = ToDosService;
