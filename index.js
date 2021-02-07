const helmet = require("helmet");
const express = require('express');
const app = express();
const cors = require('cors')

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const userToDosApi = require('./routes/userToDos.js');
const email = require('./routes/email');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ["https://rexguzman.github.io", "http://localhost:8080"],
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(helmet());

// routes
authApi(app);
userToDosApi(app);
email(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});