const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment.js");

User.hasMany(Post, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Post.belongTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Post.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comment.belongTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comment.belongTo(Post, {
  foreignKey: "user_id",
  onDelete: "cascade",
});
