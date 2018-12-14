'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccountTransaction = sequelize.define('AccountTransaction', {
    amount: DataTypes.DECIMAL,
    type: DataTypes.STRING
  }, {});
  AccountTransaction.associate = function(models) {
    // associations can be defined here
    models.AccountTransaction.belongsTo(models.Account, {
      foreignKey: {
        fieldName: 'accountId'
      }
    });
  };
  return AccountTransaction;
};