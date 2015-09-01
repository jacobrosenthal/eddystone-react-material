'use strict';

var randomWords = require('random-words');

module.exports = function getNewPeripheral() {
  return {
    name: randomWords({ exactly: 2, join: ' ' }),
    status: 'Out of Range',
    tlmCount: 2,
    tlmPeriod: 10,
    namespaceId: '00010203040506070809',
    instanceId: 'aabbccddeeff',
    url: 'http://',
    type: 'url',
    temperature: 25,
    battery: 100,
    nameErrorText: '',
    namespaceIdError: '',
    instanceIdError: '',
    tlmPeriodError: '',
    tlmCountError: '',
    batteryError: '',
    temperatureError: '',
    urlError: '',
    eddystone: null
  };
};