// Requirements

// ·         A bank that has a name as well as a list of accounts

// ·         The following types of accounts: Checking, Corporate Investment, Individual Investment

// ·         All accounts must have an owner

// ·         All accounts must support deposits, withdrawals, and transfers to any other type of account

// ·         Individual Investment accounts can withdraw up to $1,000 at a time

// ·         It is not permissible to overdraft an account 

const db = require('../models');

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  findById(id) {
    return db[this.model].findById(id);
  }

  create (inputData, options) {
    options = options || {};
    return db[this.model].create(
      inputData,
      options
    );
  }

  update (inputData, id, options) {
    options = options || {};
    options.where = { id };
    return db[this.model].update(
      inputData,
      options
    );
  }

  destroy (id, options) {
    options = options || {};
    options.where = { id };
    return db[this.model].destroy({ where: { id } });
  }

  getModel () {
    return db[this.model];
  }
}

module.exports = BaseRepository;
