const BaseService = require("./base.service");

class PostService extends BaseService {
  constructor({ PostRepository }) {
    super(PostRepository);
  }

  async getAllPosts() {
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

  async getUserPost(userId, postId) {
    try {
      return await this.repository.get({
        where: {
          user_id: userId,
          id: postId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async createPost(userId, data) {
    try {
      const postData = {
        user_id: userId,
        ...data,
      };

      return await this.create(postData);
    } catch (error) {
      throw error;
    }
  }

  async updatePost(userId, postId, data) {
    try {
      return await this.repository
        .update(
          {
            where: {
              user_id: userId,
              id: postId,
            },
          },
          data
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

  async deletePost(userId, postId) {
    try {
      return await this.repository
        .delete({
          where: {
            user_id: userId,
            id: postId,
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

module.exports = PostService;
