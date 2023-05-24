import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

export const screenwidth = width;
export const screenheight = height;

//  just give value in percentages

export const respHeight = h => {
  return height * h * 0.01;
};

export const respWidth = h => {
  return width * h * 0.01;
};
