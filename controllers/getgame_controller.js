const path = require('path');

class GetGameController {
  getGame(req, res) {
    res.sendFile(path.join(__dirname, '../public/getgame.html'));
  }
}

module.exports = new GetGameController();
