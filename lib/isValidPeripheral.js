'use strict';

module.exports = function (peripheral) {

  if (peripheral.type === 'url' && !peripheral.errors.nameErrorText && !peripheral.errors.urlEror && !peripheral.errors.tlmPeriodError && !peripheral.errors.tlmCountError && !peripheral.errors.batteryError && !peripheral.errors.temperatureError) {
    return true;
  } else if (peripheral.type === 'uid' && !peripheral.errors.nameErrorText && !peripheral.errors.namespaceIdError && !peripheral.errors.instanceIdError && !peripheral.errors.tlmPeriodError && !peripheral.errors.tlmCountError && !peripheral.errors.batteryError && !peripheral.errors.temperatureError) {
    return true;
  }
  return false;
};