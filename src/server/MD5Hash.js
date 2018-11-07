'use strict'

var crypt = require('crypto');

function Hash(string) {
    return crypt.createHash('md5').update(string).digest('hex');
}

module.exports = {
    Hash
}