import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../../components/UI/AppText';
import DeviceInfo from 'react-native-device-info';
import {useEffect} from 'react';
import {useState} from 'react';
import Smcard from '../../components/UI/SmallCard/smcard';
import {
  getFreeStorage,
  getInPercentage,
  getMomentDate,
} from '../../constants/myFunctions';
import mycolors from '../../styles/mycolors';
import {NetworkInfo} from 'react-native-network-info';

const DeviceInfo1 = () => {
  const [deviceInformation, setdeviceInformation] = useState({
    did: null,
    dFreeStorage: null,
    battrry: null,
    name: null,
    date: null,
    ip: null,
    model: null,
    securitypatch: null,
    dTotalStorage: null,
    dTotalRAM: null,
    isPin: new Boolean(),
  });
  useEffect(() => {
    getDeviceInfo();
  }, []);

  const getDeviceInfo = async () => {
    try {
      const did = await DeviceInfo.getAndroidId();
      let dFreeStorage = await DeviceInfo.getFreeDiskStorage();
      let dTotalStorage = await DeviceInfo.getTotalDiskCapacity();
      let dTotalRAM = await DeviceInfo.getTotalMemory();

      dFreeStorage = getFreeStorage(dFreeStorage);
      dTotalStorage = getFreeStorage(dTotalStorage);
      dTotalRAM = getFreeStorage(dTotalRAM);

      let battrry = await DeviceInfo.getBatteryLevel();
      battrry = getInPercentage(battrry);
      let name = await DeviceInfo.getDeviceName();
      let model = await DeviceInfo.getModel();

      let firstDate = await DeviceInfo.getFirstInstallTime();
      const date = getMomentDate(firstDate);
      const ip = await DeviceInfo.getIpAddress();
      const securitypatch = await DeviceInfo.getSecurityPatch();
      const isPin = await DeviceInfo.isPinOrFingerprintSet();
      // const ipadd = NetworkInfo.getIPAddress();

      await NetworkInfo.getIPV4Address()
        .then(e => console.log('networkIP:', e))
        .catch(e => console.log('error:\n\n', e));

      setdeviceInformation({
        did,
        dFreeStorage,
        battrry,
        name,
        model,
        date,
        ip,
        securitypatch,
        dTotalStorage,
        dTotalRAM,
        isPin,
      });
    } catch (error) {
      console.log('deviceInfoMthodErr__:\n\n', error);
    }
  };

  // console.log('isPin:', isPin);

  return (
    <View style={styles.deviceInfo}>
      <Smcard
        style={{
          backgroundColor: mycolors.primaryorange,
          padding: 15,
          marginBottom: 10,
        }}>
        <AppText style={styles.headerText}>Your Device Info </AppText>
      </Smcard>

      <Smcard
        style={{
          backgroundColor: mycolors.primaryorange,
          padding: 15,
          // margin: 15,
          // color: mycolors.white,
        }}>
        <AppText style={styles.primaryText}>
          Device id :
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.did}
          </AppText>
        </AppText>

        {/* Device Available Space : */}
        <AppText style={styles.primaryText}>
          Device Available Space :
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.dFreeStorage}
          </AppText>
        </AppText>

        {/* Device Total Space : */}
        <AppText style={styles.primaryText}>
          Device Available Space :
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.dTotalStorage}
          </AppText>
        </AppText>
        {/* Device Total RAM : */}
        <AppText style={styles.primaryText}>
          Device Available Space :
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.dTotalRAM}
          </AppText>
        </AppText>
        <AppText style={styles.primaryText}>
          Device Battery :{' '}
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.battrry}
          </AppText>
        </AppText>
        <AppText style={styles.primaryText}>
          Device Name :
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.name}
          </AppText>
        </AppText>

        {/* device model */}
        <AppText style={styles.primaryText}>
          Device Model :
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.model}
          </AppText>
        </AppText>
        {/* ipaddress */}
        <AppText style={styles.primaryText}>
          Device Date :
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.ip}
          </AppText>
        </AppText>
        {/* securtity patch */}
        <AppText style={styles.primaryText}>
          Security Patch :
          <AppText style={{fontWeight: 'bold', color: mycolors.white}}>
            {deviceInformation.securitypatch}
          </AppText>
        </AppText>
      </Smcard>
    </View>
  );
};

const styles = StyleSheet.create({
  deviceInfo: {
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: mycolors.white,
    // alignSelf:'center'
  },
  primaryText: {
    fontSize: 16,
    color: mycolors.white,
    marginVertical: 5,
  },
});

export default DeviceInfo1;
