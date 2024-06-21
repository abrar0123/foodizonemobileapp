import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import mycolors from '../../../styles/mycolors';
import {BleManager} from 'react-native-ble-plx';
import React, {useEffect, useState} from 'react';
import Button from '../../../components/UI/Button/Button';

const BluetoothPlx = () => {
  const manager = new BleManager();
  const [permits, setPermits] = useState(false);

  const permit = async () => {
    const loc = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    const bleScan = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    );
    const bleConnect = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    );
    if (loc && bleScan && bleConnect) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      setPermits(true);
    }
    return false;
  };

  React.useEffect(() => {
    permit();

    const subscription = manager.onStateChange(state => {
      console.log('state >>> ', state);
      if (state === 'PoweredOn') {
        scanAndConnect();
        // return subscription.remove();
      }
    });

    // return () => subscription.remove();
  }, [manager]);

  const scanAndConnect = async () => {
    if (permits) {
      manager.startDeviceScan(null, null, (err, device) => {
        if (device?.localName && device.localName !== null) {
          console.log('devices 105 : ', device.localName);
          manager.stopDeviceScan();
        }
      });
    }
  };
  //   console.log('manager', manager);
  return (
    <View style={styles.main}>
      {/* <Button>Scanning</Button> */}
      <Button onPress={scanAndConnect}>Scanning </Button>
      <Text style={{color: 'black'}}>Ok, Good</Text>
    </View>
  );
};
export default BluetoothPlx;

const styles = StyleSheet.create({
  main: {
    backgroundColor: mycolors.green100,
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});
