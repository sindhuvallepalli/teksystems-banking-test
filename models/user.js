'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
  });

  User.associate = function(models) {
    models.User.belongsTo(models.Bank, {
      foreignKey: {
        fieldName: 'bankId'
      }
    });
    models.User.hasMany(models.Account, {
      foreignKey: {
        fieldName: 'userId'
      }
    });
  };

  return User;
};
