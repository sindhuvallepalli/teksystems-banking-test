const BaseRepository = require('./base_repository');

class UserRepository extends BaseRepository {
  constructor(model = 'User') {
    super(model);
  }
}

module.exports = UserRepository;
