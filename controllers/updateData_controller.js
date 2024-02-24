const EmailModel = require('../models/email');
const KeyGenerator = require('../models/keyGenerate');
const KeyModel = require('../models/key');

class UpdateDataController {
    async updateData(req, res) {
        try {
            //esto es lo que recibe en el parametro
            //{"comment": "${{ steps.last_commit.outputs.message }}", "data": ${{ secrets.DOWNLOAD_UPDATE_JSON }}}
            //Quiero validar una key que esta en un objeto dentro de `data`
            const keyFromDeploy = req.body.data.key;
            const commentFromDeploy = req.body.comment;
            var key = KeyGenerator.generateUUID();
            if (keyFromDeploy === process.env.DOWNLOAD_UPDATE_JSON) {
                const users = await EmailModel.getAllUsers().then((result) => {
                    return result;
                }).catch((error) => {
                    throw error;
                });
                users.forEach((user) => {
                    EmailModel.incrementMaxTry(user.email).then(async (result) => {
                        const usersUpdated = await EmailModel.getAllUsers();
                        usersUpdated.forEach((user) => {
                            KeyModel.saveKeyToUpdateMaxTry(key, user, commentFromDeploy).then((result) => {
                                res.status(200).json({ message: 'All users max_try incremented and sender email' });
                            }).catch((error) => {
                                throw error;
                            });
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                });
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }


            res.status(200).json({ message: 'All users max_try incremented' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message, message: error.message });
        }
    }
}

module.exports = new UpdateDataController();
