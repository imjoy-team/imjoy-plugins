const md5 = require('./md5');

module.exports = (string) => new Promise(
  (resolve, reject) => {
    md5(string, (err, hash) => {
      return err ? reject(err) : resolve(hash)
    })
  }
)
