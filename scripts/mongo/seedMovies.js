// DEBUG=app:* node scripts/mongo/seedToDos.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:toDos');
const MongoLib = require('../../lib/mongo');
const { toDosMock } = require('../../utils/mocks/toDos');

async function seedToDos() {
  try {
    const mongoDB = new MongoLib();

    const promises = toDosMock.map(async toDo => {
      await mongoDB.create('to-dos', toDo);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} to-dos have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedToDos();
