import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import AppText from '../../components/UI/AppText';
import {respWidth} from '../../components/responsiveness/RespHeight';
import mycolors from '../../styles/mycolors';
import {moderateScale, scale} from 'react-native-size-matters';
import {LineChart} from 'react-native-chart-kit';

const MyLineChart = () => {
  return (
    <View style={styles.homeStyle} >
      <AppText style={styles.headerText}>welcome to chart kit</AppText>
      <View>
        <AppText>Bezier Line Chart</AppText>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','Sep'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,

                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeStyle: {
    paddingHorizontal: respWidth(3),
    backgroundColor: mycolors.white,
    flex: 1,
  },
  flexstyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(3),
    padding: moderateScale(5),
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: scale(22),
  },
});

export default MyLineChart;
