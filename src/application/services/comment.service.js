const BaseService = require("./base.service");

class CommentService extends BaseService {
  constructor({ CommentRepository }) {
    super(CommentRepository);
  }

  async getAllComments() {
    try {
      return await this.repository.getAllCount({});
    } catch (error) {
      throw error;
    }
  }

  async getById(commentId) {
    try {
      return await this.repository.getById(commentId);
    } catch (error) {}
  }

  async getAllByPostId(postId) {
    try {
      return await this.repository.getAllCount({
        where: {
          post_id: postId,
        },
      });
    } catch (error) {}
  }

  async getAllByUserId(userId) {
    try {
      return await this.repository.getAllCount({
        where: {
          user_id: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllByUserAndPost(userId, postId) {
    try {
      return await this.repository.getAllCount({
        where: {
          user_id: userId,
          post_id: postId,
        },
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

      return await this.create(commentData);
    } catch (error) {
      throw error;
    }
  }

  async updateComment(userId, commentId, data) {
    try {
      return await this.repository.update(
        {
          where: {
            user_id: userId,
            id: commentId,
          },
        },
        ...data
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(userId, commentId) {
    try {
      return await this.repository.delete({
        where: {
          user_id: userId,
          id: commentId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentService;
