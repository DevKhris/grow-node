const { createContainer, asClass, asValue, asFunction } = require("awilix");

// Application
const app = require("../server");

// Routes
const AuthRoutes = require("../../presentation/routes/auth.routes");
const PostRoutes = require("../../presentation/routes/post.routes");
const CommentRoutes = require("../../presentation/routes/comment.routes");
const Routes = require("../../presentation/routes/index");

// Services
const AuthService = require("./../../application/services/auth.service");
const PostService = require("./../../application/services/post.service");
const CommentService = require("./../../application/services/comment.service");

// Model
const User = require("./../../infra/database/entities/user");
const Post = require("./../../infra/database/entities/post");
const Comment = require("./../../infra/database/entities/comment");

// Repositories
const UserRepository = require("./../../infra/database/repositories/user.repository");
const PostRepository = require("./../../infra/database/repositories/post.repository");
const CommentRepository = require("./../../infra/database/repositories/comment.repository");

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
  })
  // Posts
  .register({
    PostRoutes: asFunction(PostRoutes),
    PostService: asClass(PostService).singleton(),
    PostRepository: asClass(PostRepository).singleton(),
    Post: asValue(Post),
  })
  // Comments
  .register({
    CommentRoutes: asFunction(CommentRoutes),
    CommentService: asClass(CommentService).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
    Comment: asValue(Comment),
  });

module.exports = container;
