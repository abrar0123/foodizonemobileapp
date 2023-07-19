import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {Modal} from 'react-native';
import mycolors from '../../styles/mycolors';
import { respHeight, respWidth } from '../responsiveness/RespHeight';
const CustomLoader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <ActivityIndicator size={'large'} color={mycolors.primaryorange} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // width: '100%',
    // height: '100%',
    backgroundColor: mycolors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: respWidth(30),
    height: respHeight(15),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mycolors.white,
  },
});

export default CustomLoader;
