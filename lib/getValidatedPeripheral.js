'use strict';

module.exports = function (peripheral, variable, value) {

  if (variable === 'name') {
    if (!value) {
      peripheral.nameErrorText = 'You must name your Device';
    } else {
      peripheral.nameErrorText = '';
    }
  }

  if (variable === 'tlmCount') {
    if (!isNumber(value)) {
      peripheral.tlmCountError = 'Must be a number';
    } else {
      peripheral.tlmCountError = '';
    }
  }

  if (variable === 'tlmPeriod') {
    if (!isNumber(value)) {
      peripheral.tlmPeriodError = 'Must be a number';
    } else {
      peripheral.tlmPeriodError = '';
    }
  }

  if (variable === 'namespaceId') {
    if (!value || value.length !== 20) {
      peripheral.namespaceIdError = 'Must be 20 digits hex number';
    } else {
      peripheral.namespaceIdError = '';
    }
  }

  if (variable === 'instanceId') {
    if (!value || value.length !== 12) {
      peripheral.instanceIdError = 'Must be 12 digits hex number';
    } else {
      peripheral.instanceIdError = '';
    }
  }

  if (variable === 'battery') {
    if (!isNumber(value)) {
      peripheral.batteryError = 'Must be a number';
    } else {
      peripheral.batteryError = '';
    }
  }

  if (variable === 'temperature') {
    if (!isNumber(value)) {
      peripheral.temperatureError = 'Must be a number';
    } else {
      peripheral.temperatureError = '';
    }
  }

  if (variable === 'url') {
    if (!value) {
      peripheral.urlError = 'You must set a url';
    } else {
      peripheral.urlError = '';
    }
  }

  // status and type unremarkable

  peripheral[variable] = value;
  return peripheral;
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}