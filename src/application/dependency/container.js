const { createContainer, asClass, asValue, asFunction } = require("awilix");

// Application
const app = require("../server");

// Routes
const AuthRoutes = require("../../presentation/routes/auth.routes");
const Routes = require("../../presentation/routes/index");

// Services
const AuthService = require("./../../application/services/auth.service");

// Model
const User = require("./../../infra/database/entities/user");
// Repositories
const UserRepository = require("./../../infra/database/repositories/user.repository");

// Container (IoC)
const container = createContainer();

// Register dependencies
container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
  })
  // Auth
  .register({
    AuthRoutes: asFunction(AuthRoutes),
    AuthService: asClass(AuthService).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
    User: asValue(User),
  });

// Posts

// Comments

module.exports = container;
