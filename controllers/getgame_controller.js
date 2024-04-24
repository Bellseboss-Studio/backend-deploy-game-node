const path = require('path');
const KeyModel = require('../models/key');
const logger = require('../logger');
const link = require('../models/link');

class GetGameController {
  getGame(req, res) {
    // get data from GET parameters
    let key = req.query.key;
    logger.info(key);
    //validate the key is valid
    KeyModel.validateKey(key).then((result) => {
      logger.info([result, 'result']);
      if (result) {
        //consult db from the url link
        link.getLinksByStatus(0).then((result) => {
          res.redirect(result.link);
        });
      } else {
        //llave usada
        res.sendFile(path.join(__dirname, '../public', 'getgamefail.html'));
      }
    }).catch((error) => {
      logger.info(error);
      res.sendFile(path.join(__dirname, '../public', 'getgamefailLlavenoexiste.html'));
    });
  }
}

module.exports = new GetGameController();
