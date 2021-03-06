const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }
  
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { name, email, password, verifiedEmail } = user;

    const queriedUser = await this.getUser({ email: user.email });

    if (!queriedUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const createUserId = await this.mongoDB.create(this.collection, {
        name,
        email,
        password: hashedPassword,
        verifiedEmail,
      });
  
      return createUserId;

    }else{
      throw 'user already exist';
    }


  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });

    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });
    return await this.getUser({ email: user.email });
  }
}

module.exports = UsersService;
