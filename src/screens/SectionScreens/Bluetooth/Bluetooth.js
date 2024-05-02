import {NativeModules, PermissionsAndroid, StyleSheet, View} from 'react-native';
import AppText from '../../../components/UI/AppText';
import {TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import BleManager from 'react-native-ble-manager';

const Bluetooth = () => {

  useEffect(() => {
    const bluetoothPermit = async () => {
      try {
        // const checkP = PermissionsAndroid.check(
        //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // ).then((e)=>console.log("location accessed : ",e)).
        // catch((a)=>console.log("not loc",a));
        // console.log('permission accessed ======= ',checkP);
        // if (checkP) {
          const ss =await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (ss) {
            console.log('user is accepted >>> ',ss);
          } else {
            console.log('user dont is accepted >>> ');
          // }
        }
      } catch (error) {
        console.log('permission accessed ======= ', error);
      }
    };


    bluetoothPermit();


   

  });
 const bleFunc=()=>{
  try {
    
      BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });  
  } catch (error) {
      console.log('Bluetooth is turned ',error);
    
  }  
    }


  return (
    <View style={styles.main}>
      <AppText>This is Bluetooth screen</AppText>

      <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle} onPress={bleFunc}>
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
