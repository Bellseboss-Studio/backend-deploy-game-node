const nodemailer = require('nodemailer');
const logger = require('../logger');

class Mailer {
  constructor(host, port, secure, user, pass) {
    logger.info('Mailer', 'constructor', 'host', host, 'port', port, 'secure', secure, 'user', user, 'pass', pass);
    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: secure, // true for 465, false for other ports
      auth: {
        user: user,
        pass: pass
      }
    });
  }

  sendMail(from, to, subject, html) {
    logger.info('Mailer', 'sendMail', 'from', from, 'to', to, 'subject', subject, 'html', html);
    let mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      logger.info('Mailer', 'sendMail', 'error', error, 'info', info);
      if (error) {
        logger.info(error, 'error in sendMail Mailer');
        throw new Exception(error);
      } else {
        logger.info('Email in sendMail Mailer: ' + info.response);
      }
    });
  }
}

module.exports = Mailer;