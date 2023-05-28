import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
} from 'react-native';
import AppText from '../../components/UI/AppText';
import mycolors from '../../styles/mycolors';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import Smcard from '../../components/UI/SmallCard/smcard';
import {moderateScale} from 'react-native-size-matters';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import imagesPath from '../../constants/imagesPath';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Myorder = () => {
  const location = {
    pickupCors: {
      latitude: 30.7046,
      longitude: 76.7179,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    droplocationCors: {
      latitude: 30.7333,
      longitude: 76.7794,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
  const [state, setstate] = useState(location);
  const [qrshow, setqrshow] = useState(false);
  const {pickupCors, droplocationCors} = state;

  const onSuccess = e => {
    Alert.alert('Qr Code Data', e.data, [
      {text: 'close'},
      {text: 'Ok', onPress: qrdataHandler},
    ]);
    qrdataHandler();
    Linking.openURL(e.data).catch(err => {
      console.log('error__', err);
    });
  };

  const qrdataHandler = () => {
    setqrshow(!qrshow);
  };
  return (
    <View style={styles.myorder}>
      <Smcard
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,

          backgroundColor: mycolors.orange,
          marginBottom: 70,
        }}>
        <AppText style={{...styles.buttonText, color: mycolors.white}}>
          Scan qr code to get information about products
        </AppText>
      </Smcard>
      <View style={{height: respHeight(60)}}>
        {qrshow ? (
          <View>
            <QRCodeScanner
              // reactivate={2000}
              onRead={onSuccess}
              flashMode={RNCamera.Constants.FlashMode.off}
              topContent={<AppText></AppText>}
              bottomContent={
                <TouchableOpacity
                  style={styles.buttonTouchable}></TouchableOpacity>
              }
            />
          </View>
        ) : (
          <Image
            source={imagesPath.Qr_Scanner}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'center',
              alignSelf: 'center',
            }}
          />
        )}
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={qrdataHandler}>
          <AppText style={styles.buttonText}>Scan My QR Code</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myorder: {
    backgroundColor: mycolors.white,
    // paddingHorizontal: respWidth(3),
    flex: 1,
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '600',
    color: mycolors.black,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    textAlign: 'center',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Myorder;
