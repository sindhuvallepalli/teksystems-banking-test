'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    type: DataTypes.STRING,
    amount: DataTypes.DECIMAL
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
    models.Account.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId'
      }
    });
    models.Account.belongsTo(models.Bank, {
      foreignKey: {
        fieldName: 'bankId'
      }
    });
  };
  return Account;
};