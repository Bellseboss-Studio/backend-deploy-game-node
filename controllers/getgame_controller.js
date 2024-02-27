const path = require('path');
const KeyModel = require('../models/key');
const logger = require('../logger');

class GetGameController {
  getGame(req, res) {
    // get data from GET parameters
    let key = req.query.key;
    logger.info(key);
    //validate the key is valid
    KeyModel.validateKey(key).then((result) => {
      logger.info(result, 'result');
      if (result) {
        const filePath = path.join(__dirname, '../files', 'mkoc.zip');
        res.download(filePath);
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
