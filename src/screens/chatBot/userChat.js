import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AppText from '../../components/UI/AppText';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
import mycolors from '../../styles/mycolors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Smcard from '../../components/UI/SmallCard/smcard';
import {scale} from 'react-native-size-matters';

const data = [
  {id: 0, name: 'user', icon: 'users'},
  {id: 1, name: 'settings', icon: 'settings'},
];

const UserChat = () => {
  const [userdata, setuserdata] = useState(data);
  const [isSelected, setisSelected] = useState(0);
  const [fireStoreUsres, setfireStoreUsres] = useState([]);

  const myEmail = useSelector(state => state.auth.loggedInCredential);
  console.log('fireStoreUsres__', fireStoreUsres);
  const email = myEmail.email;

  const mygetFireStoreUsers = () => {
    try {
      firestore()
        .collection('RegisterUsers')
        .where('email', '!=', email)
        .get()
        .then(data1 => {
          const users = [];
          for (let p of data1.docs) {
            users.push(p.data());
          }
          setfireStoreUsres(users);
          //   console.log('All_users___:\n\n\n', users);

          //   setfireStoreUsres(data1.docs);
        })
        .catch(data1 => console.log('error44_', data1));
    } catch (error) {
      console.log('Err__:\n', error);
    }
  };

  useEffect(() => {
    mygetFireStoreUsers();
  }, []);

  const renderItem = ({item}) => {
    console.log('Item11:___:\n\n', item);
    return (
      <TouchableOpacity activeOpacity={0.9}>
        <Smcard style={{...styles.smcard, ...styles.flexApply}}>
          <View style={{...styles.bikeContainer}}>
            <EvilIcons name="user" size={35} color={mycolors.white} />
          </View>
          <View>
            <AppText style={styles.primaryText}> {item.email}</AppText>
            <AppText style={styles.primaryText}> {item.username}</AppText>
          </View>
          <AppText style={styles.primaryText}>{item.distance}</AppText>
        </Smcard>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.chat}>
      <AppText>Welcome to user chatting</AppText>
      <FlatList data={fireStoreUsres} renderItem={renderItem} />

      <View style={styles.bottomContainer}>
        {userdata.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              id={index}
              onPress={() => setisSelected(item.id)}>
              <Feather
                name={item.icon}
                color={mycolors.white}
                size={27}
                style={{
                  color: index === isSelected ? mycolors.white : mycolors.grey,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: respHeight(10),
    backgroundColor: mycolors.silk,
    display: 'flex',
    justifyContent: 'center',
    gap: respWidth(25),
    flexDirection: 'row',
    alignItems: 'center',
  },

  //   renderData style
  smcard: {
    marginHorizontal: respWidth(1.5),
    marginVertical: respHeight(1),
    padding: 10,
    borderRadius: 10,
    backgroundColor: mycolors.silk,
  },

  primaryText: {
    fontSize: scale(16),
    // paddingHorizontal: respWidth(3),
    // marginVertical: respHeight(1),
    color: mycolors.white,
  },

  flexApply: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    // justifyContent: 'center',
  },
});

export default UserChat;
