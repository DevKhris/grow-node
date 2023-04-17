const BaseService = require("./base.service");

class PostService extends BaseService {
  constructor({ PostRepository }) {
    super(PostRepository);
  }

  async getAllPosts() {
    try {
      return await this.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getAllByUserId(userId) {
    try {
      return await this.repository.getAllCount({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserPost(userId, postId) {
    try {
      const post = await this.repository.get({
        where: {
          userId: userId,
          id: postId,
        },
      });

      if (!post) {
        return false;
      }
      return post;
    } catch (error) {
      throw error;
    }
  }
  async createPost(userId, data) {
    try {
      const postData = {
        userId: userId,
        ...data,
      };

      const post = await this.create(postData);

      if (!post) {
        return false;
      }
      return post;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(userId, postId, data) {
    try {
      const post = await this.repository.update(
        {
          where: {
            userId: userId,
            id: postId,
          },
        },
        ...data
      );

      if (!post) {
        return false;
      }
      return post;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(userId, postId) {
    try {
      const result = await this.repository.delete({
        where: {
          userId: userId,
          id: postId,
        },
      });

      if (!result) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;
