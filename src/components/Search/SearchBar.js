import React from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';
import imagesPath from '../../constants/imagesPath';
import mycolors from '../../styles/mycolors';
import {scale} from 'react-native-size-matters';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Image source={imagesPath.search} style={styles.imagstyle} />
        <TextInput style={styles.textInput} placeholder="Search for Foods" />
      </View>
      <Image source={imagesPath.filter} style={styles.imagstyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  imagstyle: {
    width: 30,
    height: 25,
  },
  inputContainer: {
    shadowColor: mycolors.black,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: mycolors.white,

    // backgroundColor: mycolors.grey,
  },
  textInput: {
    width: '80%',
    fontSize: scale(18),
    // backgroundColor: mycolors.jamanlight,
  },
});

export default SearchBar;
