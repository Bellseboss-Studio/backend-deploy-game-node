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
    const { email } = req.body;
    EmailModel.saveEmail(email).then((result) => {
      console.log(result, 'savedEmail in UserController.saveEmail');
      res.json({ email: result.email });
    }
    ).catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.message, message: error.message });
    });
  }
}

module.exports = new UserController();
