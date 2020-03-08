const crypto = require('crypto');

module.exports = function (string, callback) {
    const withCallback = typeof callback === 'function';

    try {

        const hash = crypto.createHash('md5')
            .update(string)
            .digest('hex');

        withCallback && callback(null, hash);

    } catch (e) {
        if (withCallback) callback(e);
        else throw e;
    }
}
