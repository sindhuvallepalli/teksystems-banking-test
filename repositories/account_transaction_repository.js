const BaseRepository = require('./base_repository');

class AccountTransactionRepository extends BaseRepository {
  constructor(model = 'AccountTransaction') {
    super(model);
  }
}

module.exports = AccountTransactionRepository;
