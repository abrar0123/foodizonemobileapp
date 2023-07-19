import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import {useState, useEffect} from 'react';
import AppText from '../../../components/UI/AppText';
import ListFood from './listfood';
import Card from '../../../components/UI/Card/Card';
import mycolors from '../../../styles/mycolors';
import {scale} from 'react-native-size-matters';
import {respWidth} from '../../../components/responsiveness/RespHeight';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';

const screens = [
  {
    id: 1,
    name: 'List Food',
    status: true,
  },
  {
    id: 2,
    name: 'Grid Food',
    status: true,
  },
];

const MyFood = ({foodapidata, navigation}) => {
  // const [MyFood, setMyFood] = useState([]);
  const [ind, setind] = useState(1);
  const [Loader, setLoader] = useState(false);
  const [number, setNumber] = useState(9);
  const isLoading = useSelector(state => state.foodapi.loading);
  // const isLoading = true;

  const myFoodApi = async () => {
    try {
      setLoader(true);
      console.log('data fetch started');
      const data = await fetch(
        'https://www.themealdb.com/api/json/v2/1/categories.php',
      );
      const response = await data.json();
      // console.log("MyFood_API__:\n\n\n", response.categories);
      setMyFood(response.categories);
    } catch (error) {
      console.log('MyFood_API___Error___:', error);
    }
    setLoader(false);
  };

  const pressHandler = id => {
    setind(id);
    // console.log("food", MyFood);
  };

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: ind === item.id ? mycolors.jaman : mycolors.grey,
            },
          ]}
          onPress={pressHandler.bind(this, item.id)}>
          <AppText
            style={{
              color: ind === item.id ? mycolors.white : mycolors.jaman,
              fontSize: 18,
            }}>
            {item.name}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <React.Fragment>
      {/* <FlatList
          data={screens}
          numColumns={2}
          key={item => item.id}
          renderItem={renderItem}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
        /> */}
      <AppText style={styles.welcomeText}>FastFood Deals</AppText>
      {isLoading ? (
        //   <Spinner
        //     visible={!isLoading}
        //     size={45}
        //     animation="fade"
        //     color={mycolors.blue}
        //     textStyle={mycolors.white}
        //     textContent={'Loading...'}
        //   />
        <CustomLoader />
      ) : (
        <ListFood
          MyFood={foodapidata}
          Loader={Loader}
          navigation={navigation}
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: scale(25),
    fontWeight: 'bold',
    marginBottom: 10,
    width: respWidth(50),
    borderBottomColor: mycolors.red,
    borderBottomWidth: 3,
  },
});

export default MyFood;
