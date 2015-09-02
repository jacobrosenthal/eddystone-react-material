'use strict';

module.exports = function (peripheral, variable, value) {

  if (variable === 'name') {
    if (!value) {
      peripheral.errors.nameErrorText = 'You must name your Device';
    } else {
      peripheral.errors.nameErrorText = '';
    }
  }

  if (variable === 'tlmCount') {
    if (!isNumber(value)) {
      peripheral.errors.tlmCountError = 'Must be a number';
    } else {
      peripheral.errors.tlmCountError = '';
    }
  }

  if (variable === 'tlmPeriod') {
    if (!isNumber(value)) {
      peripheral.errors.tlmPeriodError = 'Must be a number';
    } else {
      peripheral.errors.tlmPeriodError = '';
    }
  }

  if (variable === 'namespaceId') {
    if (!value || value.length !== 20) {
      peripheral.errors.namespaceIdError = 'Must be 20 digits hex number';
    } else {
      peripheral.errors.namespaceIdError = '';
    }
  }

  if (variable === 'instanceId') {
    if (!value || value.length !== 12) {
      peripheral.errors.instanceIdError = 'Must be 12 digits hex number';
    } else {
      peripheral.errors.instanceIdError = '';
    }
  }

  if (variable === 'battery') {
    if (!isNumber(value)) {
      peripheral.errors.batteryError = 'Must be a number';
    } else {
      peripheral.errors.batteryError = '';
    }
  }

  if (variable === 'temperature') {
    if (!isNumber(value)) {
      peripheral.errors.temperatureError = 'Must be a number';
    } else {
      peripheral.errors.temperatureError = '';
    }
  }

  if (variable === 'url') {
    if (!value) {
      peripheral.errors.urlError = 'You must set a url';
    } else {
      peripheral.errors.urlError = '';
    }
  }

  // status and type unremarkable

  peripheral[variable] = value;
  return peripheral;
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}