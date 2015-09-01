module.exports = function (peripheral) {

  if(peripheral.type === 'url'
    && !peripheral.nameErrorText
    && !peripheral.urlEror
    && !peripheral.tlmPeriodError
    && !peripheral.tlmCountError
    && !peripheral.batteryError
    && !peripheral.temperatureError)
  {
    return true;
  } else if(peripheral.type === 'uid'
    && !peripheral.nameErrorText
    && !peripheral.namespaceIdError
    && !peripheral.instanceIdError
    && !peripheral.tlmPeriodError
    && !peripheral.tlmCountError
    && !peripheral.batteryError
    && !peripheral.temperatureError)
  {
    return false;
  }
  return false;
};
