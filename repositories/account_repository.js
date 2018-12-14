const BaseRepository = require('./base_repository');
const AccountTransactionRepository = require('./account_transaction_repository');

class AccountRepository extends BaseRepository {
  constructor(model = 'Account') {
    super(model);
  }

  deposit(id, amount) {
    return new Promise((resolve, reject) => {
      this.findById(id).then((account) => {
        if (amount <= 0) {
          return reject(new Error('Invalid Amount'));
        }
        (new AccountTransactionRepository()).create({
          amount,
          accountId: id,
          type: 'credit',
        }).then((data) => {
          this.update({
            amount: account.amount + amount,
          }, account.id).then((accounts) => {
            if (accounts.length>0) {
              this.findById(accounts[0]).then((acc) => {
                resolve(acc);
              }).catch((err) => {
                reject(new Error('Transaction Failed'));
              });
            } else {
              reject(new Error('Transaction Failed'));
            }
          }).catch((err) => {
            reject(new Error('Transaction Failed'));
          });
        }).catch((err) => {
          reject(new Error('Transaction Failed'));
        });
      }).catch((err) => {
        reject(new Error('Account not found'));
      });
    });
  }

  withdraw(id, amount) {
    return new Promise((resolve, reject) => {
      this.findById(id).then((account) => {
        if (amount <= 0 || amount > account.amount || amount>1000) {
          return reject(new Error('Invalid Amount'));
        }
        (new AccountTransactionRepository()).create({
          amount,
          accountId: id,
          type: 'debit',
        }).then((data) => {
          this.update({
            amount: account.amount - amount,
          }, account.id).then((accounts) => {
            if (accounts.length>0) {
              this.findById(accounts[0]).then((acc) => {
                resolve(acc);
              }).catch((err) => {
                reject(new Error('Transaction Failed'));
              });
            } else {
              reject(new Error('Transaction Failed'));
            }
          }).catch((err) => {
            reject(new Error('Transaction Failed'));
          });
        }).catch((err) => {
          reject(new Error('Transaction Failed'));
        });
      }).catch((err) => {
        reject(new Error('Account not found'));
      });
    });
  }
}

module.exports = AccountRepository;
