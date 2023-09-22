import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

export const screenwidth = width;
export const screenheight = height;

// console.log('screenheight----\t: ', screenwidth);
//  just give value in percentages

export const respHeight = h => {
  const value = height * h * 0.01;
  // console.log('myresp----\t:', value);
  return value;
};

export const respWidth = h => {
  return width * h * 0.01;
};

export const respWidth1 = h => {
  return width * h * 0.0028;
};

export const respHeight1 = h => {
  return height * h * 0.00133; // 1px = this
};
