const knex = require('../database');
const Mailer = require('./MailSender');
const fs = require('fs');


class KeyModel {
  async getAllKeys() {
    return knex('keys').select('*');
  }
  async saveKey(key, user) {
    let keys = await knex('keys').where('user_id', user.id);
    if (keys.length >= user.max_try) {
      throw new Error('the user has reached the maximum number of keys allowed for the account');
    } else {
      await knex('keys').insert({ key: key, user_id: user.id });
      let mailer = new Mailer(process.env.SERVICE, process.env.SERVICE_PORT, true, process.env.USER, process.env.PASSWORD);
      let htmlContent = fs.readFileSync(process.env.FILE_HTML_EMAIL, 'utf8');
      htmlContent = htmlContent.replace('{{name}}', user.name);
      htmlContent = htmlContent.replace('{{email}}', user.email);
      mailer.sendMail(process.env.EMAIL_FROM, user.email, process.env.EMAIL_SUBJECT, htmlContent);
      var key = knex('keys').where('key', key).first();
      return key;
    }
  }
}

module.exports = new KeyModel();
