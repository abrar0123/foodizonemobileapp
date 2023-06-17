import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import AppText from '../../components/UI/AppText';
import mycolors from '../../styles/mycolors';

const VisionCamera = () => {
  const LOCAL_ST = 'sst989';
  let ITEM = null;
  const photoCollection = [];
  const cammeraRef = useRef(null);

  const devices = useCameraDevices();
  const device = devices.back;
  const [imagePath, setimagePath] = useState(null);
  const [storedImage, setstoredImage] = useState(null);

  // console.log('devices__:', device);

  useEffect(() => {
    persmissionCmera();
  }, []);

  const getItem = async () => {
    try {
      ITEM = await AsyncStorage.getItem(LOCAL_ST);
      setstoredImage(ITEM);
      const id = Math.floor(Math.random() * 100);
      photoCollection.push({id: id, pic: `file://${ITEM}`});
    } catch (error) {}
  };

  getItem();
  console.log('photoCollection__:\n\n', photoCollection);

  const photoClick = async () => {
    const photo = await cammeraRef.current.takePhoto();
    console.log('photo___:\n\n\n', photo.path);
    AsyncStorage.setItem(LOCAL_ST, photo.path);
    setimagePath(photo.path);
  };

  const clickAgain = () => {
    setimagePath(null);
    const nullPic = AsyncStorage.removeItem(LOCAL_ST);
    setstoredImage(nullPic);
  };

  const persmissionCmera = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      const devices = await Camera.getAvailableCameraDevices();
      // console.log('devices__234:\n\n\n', devices);
    } catch (error) {
      console.log('erorr__:', error);
    }
  };
  return (
    <React.Fragment>
      {device ? (
        <React.Fragment>
          {storedImage ? (
            <>
              <Image
                // source={{uri: `file://${imagePath}`}}
                source={{uri: `file://${storedImage}`}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  //  alignSelf: 'center',
                }}
              />
              <View style={styles.captureButtonContainer}>
                <TouchableOpacity
                  style={{
                    ...styles.captureButton,
                    backgroundColor: mycolors.red,
                  }}
                  onPress={clickAgain}></TouchableOpacity>
              </View>
            </>
          ) : (
            <React.Fragment>
              <Camera
                ref={cammeraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo
              />

              <View style={styles.captureButtonContainer}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={photoClick}
                />
              </View>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <TextInput>Sorry, Not any device detect</TextInput>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  captureButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#ccc',
  },
});

export default VisionCamera;
