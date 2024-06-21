import {
  Alert,
  Linking,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  StyleSheet,
  View,
} from 'react-native';
import AppText from '../../../components/UI/AppText';
import {TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';

const Bluetooth = () => {
  const SECONDS_TO_SCAN_FOR = 3;
  const SERVICE_UUIDS = [];
  const ALLOW_DUPLICATES = true;

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  const [peripherals, setPeripherals] = useState(['id']);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const bluetoothPermit = async () => {
      try {
        const ss = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        const p1 = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        );
        const check = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        );
        // console.log('check Bluetooth permits ', check);
        if (ss) {
          // console.log('user is accepted >>> ', ss);
        } else {
          console.log('user is not accepted >>> ');
        }
      } catch (error) {
        console.log('permission accessed ======= ', error);
      }
    };

    bluetoothPermit();
    startCompanionScan();
  }, []);

  const startCompanionScan = () => {
    setPeripherals(['id']);
    try {
      console.debug('[startCompanionScan] starting companion scan...');
      BleManager.companionScan(SERVICE_UUIDS, {single: false})
        .then(peripheral => {
          console.debug(
            '[startCompanionScan] scan promise returned successfully.',
            peripheral,
          );
          if (peripheral != null) {
            setPeripherals(map => {
              return new Map(map.set(peripheral.id, peripheral));
            });
          }
        })
        .catch(err => {
          console.debug('[startCompanionScan] ble scan cancel', err);
        });
    } catch (error) {
      console.error('[startCompanionScan] ble scan error thrown', error);
    }
  };

  const scanning = () => {
    try {
      setIsScanning(true);

      BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
        matchMode: BleScanMatchMode.Sticky,
        scanMode: BleScanMode.LowLatency,
        callbackType: BleScanCallbackType.AllMatches,
      })
        .then(() => {
          console.debug('[startScan] scan promise returned successfully.');
        })
        .catch(err => {
          console.error('[startScan] ble scan returned in error', err);
        });
      bleFunc();
    } catch (error) {
      console.log('bluetooth error >>> ', error);
    }
  };

  const bleFunc = () => {
    try {
      BleManager.enableBluetooth()
        .then(() => {
          console.log('Bluetooth is turned on!');
        })
        .catch(e => {
          Alert.alert('Setting', 'test body', [
            {text: 'OFF', onPress: () => console.log('off ')},
            {text: 'ONN', onPress: () => Linking.openSettings()},
          ]);

          console.log('bluetooh is off', e);
        });
    } catch (error) {
      console.log('Bluetooth is turned ', error);
    }
  };

  return (
    <View style={styles.main}>
      <AppText>This is Bluetooth screen</AppText>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={scanning}>
        <AppText style={styles.buttonTextStyle}>
          Scan Bluetooth Devices{' '}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default Bluetooth;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
