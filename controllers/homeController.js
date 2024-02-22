const path = require('path');

class HomeController {
  index(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
}

module.exports = new HomeController();
