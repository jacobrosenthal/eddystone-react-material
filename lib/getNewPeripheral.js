'use strict';

var randomWords = require('random-words');

module.exports = function getNewPeripheral() {
  return {
    name: randomWords({ exactly: 2, join: ' ' }),
    advertising: false,
    status: 'Far',
    tlmCount: 1,
    tlmPeriod: 0,
    namespaceId: '00010203040506070809',
    instanceId: 'aabbccddeeff',
    url: 'http://',
    type: 'url',
    temperature: -128,
    battery: 0,
    errors: {},
    eddystone: require('eddystone-beacon')
  };
};