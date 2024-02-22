const nodemailer = require('nodemailer');

class Mailer {
  constructor(host, port, secure, user, pass) {
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
    let mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error, 'error in sendMail Mailer');
      } else {
        console.log('Email in sendMail Mailer: ' + info.response);
      }
    });
  }
}

module.exports = Mailer;