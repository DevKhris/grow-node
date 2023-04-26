const BaseRepository = require("./base.repository");

class PostRepository extends BaseRepository {
  constructor({ Post, logger }) {
    super(Post, logger);
  }
}

module.exports = PostRepository;
