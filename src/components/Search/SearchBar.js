import React from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';
import imagesPath from '../../constants/imagesPath';
import mycolors from '../../styles/mycolors';
import {moderateScale, scale} from 'react-native-size-matters';
import Smcard from '../UI/SmallCard/smcard';
import {respWidth} from '../responsiveness/RespHeight';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <Smcard style={styles.inputContainer}>
        <Image source={imagesPath.search} style={styles.imagstyle} />
        <TextInput style={styles.textInput} placeholder="Search for Foods" />
      </Smcard>
      <Smcard
        style={{
          paddingVertical: moderateScale(12),
          paddingHorizontal: moderateScale(7),
          borderRadius: 5,
        }}>
        <Image source={imagesPath.filter} style={styles.imagstyle} />
      </Smcard>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // gap: 5,
    justifyContent: 'space-between',
  },
  imagstyle: {
    width: respWidth(8),
    height: 25,
  },
  inputContainer: {
    paddingLeft: 10,
    width: respWidth(80),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    // backgroundColor: mycolors.red,

    // backgroundColor: mycolors.grey,
  },
  textInput: {
    width: '85%',
    fontSize: scale(18),
    // backgroundColor: mycolors.jamanlight,
  },
});

export default SearchBar;
