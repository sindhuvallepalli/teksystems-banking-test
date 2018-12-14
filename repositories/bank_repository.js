const BaseRepository = require('./base_repository');

class BankRepository extends BaseRepository {
  constructor(model = 'Bank') {
    super(model);
  }
}

module.exports = BankRepository;
