const knex = require('../database');
const Keys = require('./key');
const KeyGenerator = require('./keyGenerate');

class UserModel {
  async saveEmail(email) {
    var key = KeyGenerator.generateUUID();
    var user = await knex('users').where('email', email).first();
    if (user) {
      return await Keys.saveKey(key, user).then((result) => {
        user.key = result;
        console.log(user, 'result in saveEmail UserModel');
        return user;
      }).catch((error) => {
        throw error;
      });
    } else {
      return knex('users').insert({ email })
        .then(result => {
          const insertId = result[0];
          return knex('users').where('id', insertId).first();
        })
        .then(user => {
          return Keys.saveKey(key, user).then((result) => {
            user.key = result;
            return user;
          }).catch((error) => {
            throw error;
          });
        })
        .catch(error => {
          throw error;
        });
    }
  }
}

module.exports = new UserModel();
