import {Dimensions, Platform, StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;

const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const moderateScaleVertical = (size, factor = 0.5) => {
  const value = size + (verticalScale(size) - size);
  // console.log('responsivehIEGHT---\t:', value);
  return value;
};

const textScale = percent => {
  const screenHeight = Dimensions.get('window').height;
  //calculate absolute ratio for bygger screens 18.5:9 requiring smaller scaling

  const ratio = height / width;
  //Guideline sizes are based on standard ~5" screen mobile device
  const deviceHeight = 375
    ? screenHeight * (ratio > 1.8 ? 0.126 : 0.15) //Set guideline depending on
    : Platform.OS === 'android';
  screenHeight - StatusBar.currentHeight;

  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
};

export {
  scale,
  verticalScale,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
  height,
};
