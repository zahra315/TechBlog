const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// index route shows all existing posts on the blog
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a specific Post by id
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: {
        post_id: req.params.id,
      },
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    if (req.session.user_id === post.user_id) {
      // if the post belongs to the user, then the user can update or delete it
      res.render("post-edit", {
        ...post,
        logged_in: req.session.logged_in,
      });
    } else {
      // if the post does not belong to logged in user, then the user can add a comment
      res.render("post", {
        ...post,
        comments,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the logged in user's dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    if (postData.length > 0) {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render("dashboard", {
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the page where a logged in user can create a post
router.get("/post-create", withAuth, async (req, res) => {
  try {
    res.render("post-create", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Route for users who need the sign-up form
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
