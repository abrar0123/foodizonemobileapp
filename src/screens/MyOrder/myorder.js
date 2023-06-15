import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Alert} from 'react-native';
// import RNFS from 'react-native-fs';
import * as RNFS from 'react-native-fs';

import {useState} from 'react';
import imagesPath from '../../constants/imagesPath';

const Myorder = () => {
  const cameraRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      saveImage(data.uri);
    }
  };

  const saveImage = async uri => {
    try {
      const newPath = `${RNFS.DocumentDirectoryPath}/capturedImage.jpg`;
      await RNFS.copyFile(uri, newPath);
      setCapturedImage(newPath);
      console.log('Image saved:', newPath);
    } catch (error) {
      console.log('Failed to save image:', error);
    }
  };
  const r = 10;
  return (
    <View style={styles.container}>
      {capturedImage ? (
        <Image
          source={{uri: capturedImage}}
          style={{
            width: '80%',
            height: '80%',
            resizeMode: 'center',
            alignSelf: 'center',
          }}
        />
      ) : (
        <>
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
          />
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    // height: 00,
  },
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

export default Myorder;
