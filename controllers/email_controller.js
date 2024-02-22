const EmailModel = require('../models/email');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message, message: error.message });
    }
  }

  saveEmail(req, res) {
    try {
      const { email } = req.body;
      var user = EmailModel.saveEmail(email);
      console.log(savedEmail, 'savedEmail in UserController.saveEmail');
      res.json({ email: user.email, key: user.key.key });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message, message: error.message });
    }
  }
}

module.exports = new UserController();
