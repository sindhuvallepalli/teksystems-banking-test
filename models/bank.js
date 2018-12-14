'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Bank.associate = function(models) {
    // associations can be defined here
    models.Bank.hasMany(models.Account, {
      foreignKey: {
        fieldName: 'bankId'
      }
    });
    models.Bank.hasMany(models.User, {
      foreignKey: {
        fieldName: 'bankId'
      }
    });
  };
  return Bank;
};