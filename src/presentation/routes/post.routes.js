const AuthMiddleware = require("./../middlewares/auth.middleware");

module.exports = ({ PostService }) => {
  const router = require("express").Router();

  router.get("/posts", async (req, res) => {
    try {
      return await PostService.getAllPosts()
        .then((result) => {
          res.status(200).json({ posts: result });
        })
        .catch((error) => {
          res.status(404).json({
            message: error.message,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  router.get("/posts/:postId", async (req, res) => {
    try {
      return await PostService.getById(req.params.postId)
        .then((result) => {
          if (!result) {
            res.status(404).json({
              message: "Can't find post",
            });
          }
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(404).json({
            message: error.message,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  router.get("/posts/user/:userId", async (req, res) => {
    try {
      return await PostService.getAllByUserId(req.params.userId)
        .then((result) => {
          if (!result) {
            res.status(404).json({
              message: "Can't find post for this user",
            });
          }
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(404).json({
            message: error.message,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  router.get("/posts/:postId/user/:userId/", async (req, res) => {
    try {
      return await PostService.getUserPost(req.params.userId, req.params.postId)
        .then((result) => {
          if (!result) {
            res.status(404).json({
              message: "Can't find post",
            });
          }
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(404).json({
            message: error.message,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  router.post("/posts", AuthMiddleware, async (req, res) => {
    try {
      return await PostService.createPost(req.user.id, req.body)
        .then((result) => {
          if (!result) {
            res.status(400).json({
              message: "Can't create post",
            });
          }
          res.status(201).json(result);
        })
        .catch((error) => {
          res.status(404).json({
            message: error.message,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  router.patch("/posts/:postId", AuthMiddleware, async (req, res) => {
    try {
      return await PostService.updatePost(
        req.user.id,
        req.params.postId,
        req.body
      )
        .then((result) => {
          if (!result) {
            res.status(400).json({
              message: "Can't update post",
            });
          }
          res.status(200).json({
            message: "Post updated succesfully",
          });
        })
        .catch((error) => {
          res.status(404).json({
            message: error.message,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  router.delete("/posts/:postId", AuthMiddleware, async (req, res) => {
    try {
      return await PostService.deletePost(req.user.id, req.params.postId)
        .then((result) => {
          if (!result) {
            res.status(400).json({
              message: "Can't delete post",
            });
          }
          res.status(200).json({
            message: "Post deleted succesfully",
          });
        })
        .catch((error) => {
          res.status(404).json({
            message: error.message,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  return router;
};
