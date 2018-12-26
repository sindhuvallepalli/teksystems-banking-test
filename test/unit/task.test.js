'use strict';

var expect = require('expect.js');

const AccountRepository = require('../../repositories/account_repository');
const BankRepository = require('../../repositories/bank_repository');
const UserRepository = require('../../repositories/user_repository');

describe('Banking Tests', () => {
  before(() => {
      return require('../../models').sequelize.sync({ force : true });
  });

  // beforeEach(function () {
  //   this.UserModel = require('../../models').User;
  // });

  describe('create bank', () => {
    it('does not create a bank as name is blank', () => {
      return new BankRepository().create({ name: null }).then((bank) => {
      }).catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
    });
    it('creates a bank', () => {
      return new BankRepository().create({ name: 'AIBC' }).then((bank) => {
        this.Bank = bank;
        expect(this.Bank.name).to.equal('AIBC');
      });
    });
  });

  describe('create user', () => {
    it('creates a user', () => {
      return new UserRepository().create({ username: 'sindhu', bankId: this.Bank.id }).then((user) => {
        this.User = user;
        expect(this.User.username).to.equal('sindhu');
      });
    });
  });

  describe('create account', () => {
    it('will give error as account type is not recognized', () => {
      return new AccountRepository().create({ type: 'Sindhu', bankId: this.Bank.id, userId: this.User.id, amount: 1500 })
      .then((account) => {}).catch((error) => {
        expect(error.name).to.equal('SequelizeDatabaseError');
      });;
    });

    it('will give error as account does not have an owner', () => {
      return new AccountRepository().create({ type: 'Sindhu', bankId: this.Bank.id, amount: 1500 })
      .then((account) => {}).catch((error) => {
        expect(error.name).to.equal('SequelizeDatabaseError');
      });;
    });

    it('creates an account', () => {
      return new AccountRepository().create({ type: 'Checking', bankId: this.Bank.id, userId: this.User.id, amount: 1500 }).then((account) => {
        this.Account = account;
        expect(this.Account.type).to.equal('Checking');
        expect(this.Account.bankId).to.equal(this.Bank.id);
        expect(this.Account.userId).to.equal(this.User.id);
      });
    });

    it('finds account by id', () => {
      return new AccountRepository().findById(this.Account.id).then((account) => {
        expect(account.id).to.equal(this.Account.id);
      });
    });
  });

  describe('deposit amount in an account', () => {
    it('will deposit 500 into account', () => {
      return new AccountRepository().deposit(this.Account.id, 500).then((account) => {
        this.Account = account;
        expect(this.Account.amount).to.equal(2000);
      });
    });
  });

  describe('withdraws amount from an account', () => {
    it('will not withdraw amount from account since it is more than 1000', () => {
      return new AccountRepository().withdraw(this.Account.id, 1200).then((account) => {
      }).catch((err) => {
        expect(err.message).to.equal('Invalid Amount');
      });
    });
    
    it('will withdraw 1000 from account', () => {
      return new AccountRepository().withdraw(this.Account.id, 1000).then((account) => {
        this.Account = account;
        expect(this.Account.amount).to.equal(1000);
      });
    });

    it('will withdraw 800 from account', () => {
      return new AccountRepository().withdraw(this.Account.id, 800).then((account) => {
        this.Account = account;
        expect(this.Account.amount).to.equal(200);
      });
    });

    it('will not withdraw 500 from account(current balance: 200) as It is not permissible to overdraft an account', () => {
      return new AccountRepository().withdraw(this.Account.id, 800).then((account) => {
      }).catch((err) => {
        expect(err.message).to.equal('Invalid Amount');
      });
    });
  });
  
});
