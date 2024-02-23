const path = require('path');
const KeyModel = require('../models/key');

class GetGameController {
  getGame(req, res) {
    // get data from GET parameters
    let key = req.query.key;
    console.log(key);
    //validate the key is valid
    KeyModel.validateKey(key).then((result) => {
      console.log(result, 'result');
      if (result) {
        const filePath = path.join(__dirname, '../files', 'mkoc.zip');
        res.download(filePath);
      } else {
        //llave usada
        res.sendFile(path.join(__dirname, '../public', 'getgamefail.html'));
      }
    }).catch((error) => {
      console.log(error);
      res.sendFile(path.join(__dirname, '../public', 'getgamefailLlavenoexiste.html'));
    });
  }
}

module.exports = new GetGameController();
