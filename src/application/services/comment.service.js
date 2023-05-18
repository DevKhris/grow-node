const BaseService = require("./base.service");

class CommentService extends BaseService {
  constructor({ CommentRepository }) {
    super(CommentRepository);
  }

  async getAllComments() {
    try {
      return await this.repository
        .getAllCount({})
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async getById(commentId) {
    try {
      return await this.repository
        .getById(commentId)
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {}
  }

  async getAllByPostId(postId) {
    try {
      return await this.repository
        .getAllCount({
          where: {
            post_id: postId,
          },
        })
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async getAllByUserId(userId) {
    try {
      return await this.repository
        .getAllCount({
          where: {
            user_id: userId,
          },
        })
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async getAllByUserAndPost(userId, postId) {
    try {
      return await this.repository
        .getAllCount({
          where: {
            user_id: userId,
            post_id: postId,
          },
        })
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async createComment(userId, postId, data) {
    try {
      const commentData = {
        user_id: userId,
        post_id: postId,
        ...data,
      };

      return await this.create(commentData)
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async updateComment(userId, commentId, data) {
    try {
      return await this.repository
        .update(
          {
            where: {
              user_id: userId,
              id: commentId,
            },
          },
          ...data
        )
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(userId, commentId) {
    try {
      return await this.repository
        .delete({
          where: {
            user_id: userId,
            id: commentId,
          },
        })
        .then((result) => {
          if (!result) {
            return false;
          }
          return result;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentService;
