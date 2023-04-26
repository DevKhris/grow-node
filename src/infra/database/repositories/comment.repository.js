const BaseRepository = require("./base.repository");

class CommentRepository extends BaseRepository {
  constructor({ Comment, logger }) {
    super(Comment, logger);
  }
}

module.exports = CommentRepository;
