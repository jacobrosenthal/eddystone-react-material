module.exports = function syncPeripheral (peripheral) {
  let eddystone = peripheral.eddystone;

  //for now just always stop it
  eddystone.stop();

  let options = {
    tlmCount: peripheral.tlmCount,
    tlmPeriod: peripheral.tlmPeriod
  };

  eddystone.setBatteryVoltage(peripheral.battery);
  eddystone.setTemperature(peripheral.temperature);

  switch (peripheral.status) {
    case 'Far':
    options.txPowerLevel = -21;
    break;
    case 'Near':
    options.txPowerLevel = -41;
    break;
    case 'Immediate':
    options.txPowerLevel = -61;
    break;
  };

  if(peripheral.advertising) {
    if(peripheral.type === 'uid') {
      eddystone.advertiseUid(peripheral.namespaceId, peripheral.instanceId, options);
    }else {
      eddystone.advertiseUrl(peripheral.url, options);
    }
  }
};
