import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../../components/UI/AppText';
import mycolors from '../../styles/mycolors';
import Smcard from '../../components/UI/SmallCard/smcard';
import {useEffect} from 'react';
import axios from 'axios';

const Restaurants = () => {
  useEffect(() => {
    const getFoods = async () => {
      try {
        const data = await axios.get('../../JSON/best-foods.json');
        // const data = await res.json();

        console.log('MyRestaurants__:\n\n', data);
      } catch (error) {
        console.log('MyRestaurants__0:\n\n', error);
      }
    };
    
    getFoods();

  }, []);

  return (
    <View style={styles.parent}>
      <Smcard style={styles.cardStyle}>
        <AppText style={styles.headerText}>All Restaurants</AppText>
      </Smcard>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    padding: 15,
    flex: 1,
    backgroundColor: mycolors.white,
  },
  headerText: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: mycolors.white,
    // alignSelf:'center'
  },
  primaryText: {
    fontSize: 16,
    color: mycolors.black,
    marginVertical: 5,
  },
  cardStyle: {
    backgroundColor: mycolors.primaryorange,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default Restaurants;
