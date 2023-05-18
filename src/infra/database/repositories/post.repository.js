const BaseRepository = require("./base.repository");

class PostRepository extends BaseRepository {
  constructor({ Post }) {
    super(Post);
  }
}

module.exports = PostRepository;
