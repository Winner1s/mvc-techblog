const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
   username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
   },
   password: {
    type:DataTypes.STRING,
    allowNull: false,
    validate: {
      len:[8]
    }
   }
  },
  {
    hooks: {
      beforeCreate: async userdata =>{
       userdata.password = await bcrypt.hash(userdata.password, 5) 
       return userdata
      }
    }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  
  });

module.exports = User;