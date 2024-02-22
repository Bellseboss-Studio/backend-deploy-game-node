const { v4: uuidv4 } = require('uuid');
class KeyGenerator {
  static generateUUID() {
    return uuidv4();
  }
}

module.exports = KeyGenerator;