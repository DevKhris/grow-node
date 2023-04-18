const AuthMiddleware = require("./../middlewares/auth.middleware");

module.exports = ({ CommentService }) => {
  const router = require("express").Router();

  router.get("/comments", async (req, res) => {
    try {
      const comments = await CommentService.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      throw error;
    }
  });

  router.get("/comments/:commentId", async (req, res) => {
    try {
      const comments = await CommentService.getById(req.params.commentId);
      res.status(200).json(comments);
    } catch (error) {
      throw error;
    }
  });

  router.get("/comments/post/:postId/", async (req, res) => {
    try {
      const comments = await CommentService.getAllByPostId(req.params.postId);
      if (!comments) {
        res.status(404).json({
          message: "Can't find comments for this post",
        });
      }
      res.status(200).json(comments);
    } catch (error) {
      throw error;
    }
  });

  router.get("/comments/user/:userId", async (req, res) => {
    try {
      const comments = await CommentService.getAllByUserId(req.params.userId);
      if (!comments) {
        res.status(404).json({
          message: "Can't find post for this user",
        });
      }
      res.status(200).json(comments);
    } catch (error) {
      throw error;
    }
  });

  router.get("/comments/user/:userId/posts/:postId", async (req, res) => {
    try {
      const comment = await CommentService.getAllByUserAndPost(
        req.params.userId,
        req.params.postId
      );

      if (!comment) {
        res.status(404).json({
          message: "Can't find comment for this post",
        });
      }
      res.status(200).json(comment);
    } catch (error) {
      throw error;
    }
  });

  router.post("/comments/:postId", AuthMiddleware, async (req, res) => {
    try {
      const comment = await CommentService.createComment(
        req.user.id,
        req.params.postId,
        req.body
      );

      if (!comment) {
        res.status(400).json({
          message: "Can't create comment for this post",
        });
      }
      res.status(201).json(comment);
    } catch (error) {
      throw error;
    }
  });

  router.patch("/comments/:commentId", AuthMiddleware, async (req, res) => {
    try {
      const result = await CommentService.updateComment(
        req.user.id,
        req.params.commentId,
        req.body
      );

      if (!result) {
        res.status(400).json({
          message: "Can't update comment for this post",
        });
      }
      res.status(200).json({
        message: "Post updated succesfully",
      });
    } catch (error) {
      throw error;
    }
  });

  router.delete("/comments/:commentId", AuthMiddleware, async (req, res) => {
    try {
      const result = await CommentService.deleteComment(
        req.user.id,
        req.params.commentId
      );
      if (!result) {
        res.status(400).json({
          message: "Can't delete comment",
        });
      }
      res.status(200).json({
        message: "Comment deleted succesfully",
      });
    } catch (error) {
      throw error;
    }
  });

  return router;
};
