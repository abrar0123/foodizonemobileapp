import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const VisionCamera = () => {
  const cammeraRef = useRef(null);

  const devices = useCameraDevices();
  const device = devices.back;
  const [imagePath, setimagePath] = useState(null);
  // console.log('devices__:', device);

  useEffect(() => {
    persmissionCmera();
  }, []);

  const persmissionCmera = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      const devices = await Camera.getAvailableCameraDevices();
      console.log('devices__234:\n\n\n', devices.hasTorch);
    } catch (error) {
      console.log('erorr__:', error);
    }
  };

  const photoClick = async () => {
    const photo = await cammeraRef.current.takePhoto();
    console.log('photo___:\n\n\n', photo.path);
    setimagePath(photo.path);
  };
  const clickAgain = () => {
    setimagePath(null);
  };
  return (
    <React.Fragment>
      {device ? (
        <React.Fragment>
          {imagePath ? (
            <>
              <Image
                source={{uri: `file://${imagePath}`}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  //  alignSelf: 'center',
                }}
              />
              <View style={styles.captureButtonContainer}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={clickAgain}
                />
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
