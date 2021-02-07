const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class EmailService {
    constructor() {
      this.collection = 'users';
      this.mongoDB = new MongoLib();
    }
    
    async getUserVerifiedEmail({ userId }) {
        const user = await this.mongoDB.get(this.collection, userId);
        return user || null;
    }

    async updateUserVerifiedEmail(userId, data ) {
        const updatedToDoId = await this.mongoDB.update(
            this.collection,
            userId,
            data
        );
        return updatedToDoId;
    }
}
  
  module.exports = EmailService;