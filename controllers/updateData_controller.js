const EmailModel = require('../models/email');
const KeyGenerator = require('../models/keyGenerate');
const KeyModel = require('../models/key');

class UpdateDataController {
    async updateData(req, res) {
        try {
            const keyFromDeploy = req.body.data.key;
            const commentFromDeploy = req.body.comment;
            var numbersOfUsersToNotify = 0;
            var errorMessages = [];
            if (keyFromDeploy === process.env.DOWNLOAD_UPDATE_JSON) {
                const users = await EmailModel.getAllUsers();
                for (const user of users) {
                    try {
                        await EmailModel.incrementMaxTry(user.email);
                        var key = KeyGenerator.generateUUID();
                        await KeyModel.saveKeyToUpdateMaxTry(key, user, commentFromDeploy);
                        numbersOfUsersToNotify++;
                    } catch (error) {
                        errorMessages.push(error.message);
                        console.error(error);
                        throw error;
                    }
                }
                res.status(200).json({ message: 'All users max_try incremented and sender email', numbersOfUsersToNotify: numbersOfUsersToNotify });
            } else {
                res.status(401).json({ message: 'Unauthorized', error: errorMessages });
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message, message: error.message });
        }
    }
}

module.exports = new UpdateDataController();
