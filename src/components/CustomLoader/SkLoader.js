import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../UI/AppText';
import {respHeight, respWidth} from '../responsiveness/RespHeight';
import mycolors from '../../styles/mycolors';
import {View, StyleSheet} from 'react-native';

const SkLoader = () => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  return (
    <View style={styles.parent}>
      <ShimmerPlaceHolder
        style={{
          width: respWidth(95),
          height: respHeight(15),
          borderRadius: 5,
        }}
      />
      <ShimmerPlaceHolder
        style={{
          width: respWidth(95),
          height: respHeight(15),
          borderRadius: 5,
        }}
      />
      <ShimmerPlaceHolder
        style={{
          width: respWidth(95),
          height: respHeight(15),
          borderRadius: 5,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
  },
});
export default SkLoader;
