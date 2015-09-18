'use strict';

var randomWords = require('random-words');

module.exports = function getNewPeripheral() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    name: opts.name || randomWords({ exactly: 2, join: ' ' }),
    advertising: opts.advertising || false,
    status: opts.status || 'Far',
    tlmCount: opts.tlmCount || 2,
    tlmPeriod: opts.tlmPeriod || 10,
    namespaceId: opts.namespaceId || '00010203040506070809',
    instanceId: opts.instanceId || 'aabbccddeeff',
    url: opts.url || 'http://',
    type: opts.type || 'url',
    temperature: opts.temperature || -128,
    battery: opts.battery || 0,
    errors: {},
    eddystone: require('eddystone-beacon')
  };
};