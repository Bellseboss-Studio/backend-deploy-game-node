const knex = require('../database');
const Mailer = require('./MailSender');
const fs = require('fs');
const path = require('path');
const logger = require('../logger');


class KeyModel {

  async getAllKeys() {
    return knex('keys').select('*');
  }
  async saveKey(key, user) {
    let keys = await knex('keys').where('user_id', user.id);
    if (keys.length >= user.max_try) {
      logger.error('the user has reached the maximum number of keys allowed for the account');
      throw new Error('the user has reached the maximum number of keys allowed for the account');
    } else {
      logger.info('KeyModel', 'saveKey', 'key', key, 'user', user);
      await knex('keys').insert({ key: key, user_id: user.id });
      let mailer = new Mailer(process.env.SERVICE, process.env.SERVICE_PORT, true, process.env.USER, process.env.PASSWORD);
      logger.info('KeyModel', 'saveKey', 'mailer', mailer);
      let htmlContent = fs.readFileSync(path.resolve(__dirname, "../", process.env.FILE_HTML_EMAIL), 'utf8');
      htmlContent = htmlContent.replace('{{description}}', process.env.EMAIL_DESCRIPTION);
      htmlContent = htmlContent.replace('{{link}}', process.env.EMAIL_ENDPOINT + "?key=" + key);
      logger.info('KeyModel', 'saveKey', 'htmlContent', htmlContent);
      mailer.sendMail(process.env.EMAIL_FROM, user.email, process.env.EMAIL_SUBJECT, htmlContent);
      var key = knex('keys').where('key', key).first();
      logger.info('KeyModel', 'saveKey', 'key', key);
      return key;
    }
  }
  async saveKeyToUpdateMaxTry(key, user, comment) {
    try {
      let keys = await knex('keys').where('user_id', user.id);
      if (keys.length >= user.max_try) {
        logger.info('KeyModel', "saveKeyToUpdateMaxTry", 'error', 'the user has reached the maximum number of keys allowed for the account');
        throw new Error('the user has reached the maximum number of keys allowed for the account');
      } else {
        logger.info('KeyModel', "saveKeyToUpdateMaxTry", 'key', key, 'user', user, 'comment', comment);
        await knex('keys').insert({ key: key, user_id: user.id });
        let mailer = new Mailer(process.env.SERVICE, process.env.SERVICE_PORT, true, process.env.USER, process.env.PASSWORD);
        logger.info('KeyModel', "saveKeyToUpdateMaxTry", 'mailer', mailer);
        let htmlContent = fs.readFileSync(path.resolve(__dirname, "../" , process.env.FILE_HTML_EMAIL), 'utf8');
        htmlContent = htmlContent.replace('{{description}}', comment);
        htmlContent = htmlContent.replace('{{link}}', process.env.EMAIL_ENDPOINT + "?key=" + key);
        logger.info('KeyModel', "saveKeyToUpdateMaxTry", 'htmlContent', htmlContent);
        mailer.sendMail(process.env.EMAIL_FROM, user.email, process.env.EMAIL_SUBJECT, htmlContent);
        var key = knex('keys').where('key', key).first();
        logger.info('KeyModel', "saveKeyToUpdateMaxTry", 'key', key);
        return key;
      }
    } catch (error) {
      logger.error('KeyModel', "saveKeyToUpdateMaxTry", 'error', error);
    }
  }
  async validateKey(key) {
    let keys = await knex('keys').where('key', key);
    if (keys.length <= 0) {
      throw new Error('the key does not exist');
    }
    if (keys.length > 0 && keys[0].is_used == 0) {
      await knex('keys').where('key', key).update({ is_used: 1 });
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new KeyModel();
