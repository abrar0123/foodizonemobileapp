import React, {useState, use} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Button from '../UI/Button';
import Modal from 'react-native-modal';
import AppText from '../UI/AppText';
import mycolors from '../../styles/mycolors';
import {respHeight, respWidth} from '../responsiveness/RespHeight';
import {scale} from 'react-native-size-matters';

const PlacesModal = ({isVisible}) => {
  const [modaldata, setmodaldata] = useState(isVisible);
  const closeModalHandler = () => {
    setmodaldata(false);
  };
  return (
    <Modal isVisible={modaldata}>
      <View style={styles.model}>
        <View style={styles.modelText}>
          <AppText style={styles.headerText}>Pinned your Location</AppText>
        </View>
        {/* <SearchPlaces /> */}

        {/* <ScrollView>
          <SearchPlaces />
        </ScrollView> */}

        <View style={styles.modelContainer}>
          <Button style={styles.btnStyle} onPress={closeModalHandler}>
            Close Modal
          </Button>
          <Button style={styles.btnStyle} onPress={closeModalHandler}>
            Save Location
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  model: {
    backgroundColor: mycolors.white,
    height: respHeight(55),
    borderRadius: 25,
  },
  modelText: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: scale(19),
    // alignSelf: 'center',
    paddingHorizontal: respWidth(3),
    color: mycolors.black,
  },

  btnStyle: {
    backgroundColor: mycolors.blue,
    borderRadius: 35,
    paddingVertical: 6,
    paddingHorizontal: 8,
    margin: 0,
  },
  modelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
});

export default PlacesModal;
