const EmailModel = require('../models/email');

class UpdateDataController {
    async updateData(req, res) {
        try {
            if(req.body.key !== 'DOWNLOAD_UPDATE_JSON') {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const users = await UserModel.getAllUsers();
            users.forEach((user) => {
                EmailModel.incrementMaxTry(user.email);
            });
            res.status(200).json({ message: 'All users max_try incremented'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message, message: error.message });
        }
    }
}

module.exports = new UpdateDataController();
