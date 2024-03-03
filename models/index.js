const User = require('./User');
const blog = require('./Blog');
const Comment = require("./Comment");

User.hasMany(blog);
blog.belongsTo(User);

blog.hasMany(Comment);
Comment.belongsTo(blog);

User.hasMany(Comment);
Comment.belongsTo(user);


module.exports = { User, Post };
