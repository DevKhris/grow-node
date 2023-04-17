const AuthMiddleware = require("./../middlewares/auth.middleware");

module.exports = ({ PostService }) => {
  const router = require("express").Router();

  router.get("/posts", async (req, res) => {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      throw error;
    }
  });

  router.get("/posts/:postId", async (req, res) => {
    try {
      const post = await PostService.getById(req.params.postId);
      if (!post) {
        res.status(404).json({
          message: "Can't find post",
        });
      }
      res.status(200).json(post);
    } catch (error) {
      throw error;
    }
  });

  router.get("/posts/user/:userId", async (req, res) => {
    try {
      const posts = await PostService.getAllByUserId(req.params.userId);
      if (!posts) {
        res.status(404).json({
          message: "Can't find post for this user",
        });
      }
      res.status(200).json(posts);
    } catch (error) {
      throw error;
    }
  });

  router.get("/posts/user/:userId/posts/:postId", async (req, res) => {
    try {
      const post = await PostService.getUserPost(
        req.params.userId,
        req.params.postId
      );

      if (!post) {
        res.status(404).json({
          message: "Can't find post",
        });
      }
      res.status(200).json(post);
    } catch (error) {
      throw error;
    }
  });

  router.post("/posts", AuthMiddleware, async (req, res) => {
    try {
      const post = await PostService.createPost(req.user.id, req.body);

      if (!post) {
        res.status(400).json({
          message: "Can't create post",
        });
      }
      res.status(201).json(post);
    } catch (error) {
      throw error;
    }
  });

  router.patch(
    "/posts/user/:userId/posts/:postId",
    AuthMiddleware,
    async (req, res) => {
      try {
        const result = await PostService.updatePost(
          req.params.userId,
          req.params.postId,
          req.body
        );

        if (!result) {
          res.status(400).json({
            message: "Can't update post",
          });
        }
        res.status(200).json({
          message: "Post updated succesfully",
        });
      } catch (error) {
        throw error;
      }
    }
  );

  router.delete(
    "/posts/user/:userId/posts/:postId",
    AuthMiddleware,
    async (req, res) => {
      try {
        const result = await PostService.deletePost(
          req.params.userId,
          req.params.postId
        );
        if (!result) {
          res.status(400).json({
            message: "Can't delete post",
          });
        }
        res.status(200).json({
          message: "Post deleted succesfully",
        });
      } catch (error) {
        throw error;
      }
    }
  );

  return router;
};
