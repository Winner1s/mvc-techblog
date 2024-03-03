const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class blog extends Model {}

blog.init (
  {
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    content: {
      type:DataTypes.TEXT,
      allowNull:false
    }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  });


module.exports = blog;
