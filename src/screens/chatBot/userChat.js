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
import stackscreens from '../../constants/stackscreens';

const data = [
  {id: 0, name: 'user', icon: 'users'},
  {id: 1, name: 'settings', icon: 'settings'},
];

const UserChat = ({navigation}) => {
  const [userdata, setuserdata] = useState(data);
  const [isSelected, setisSelected] = useState(0);
  const [fireStoreUsres, setfireStoreUsres] = useState([]);

  const myEmail = useSelector(state => state.auth.loggedInCredential);
  // console.log('fireStoreUser__1\n', myEmail);
  // {"Time": "Jul 6, 2023 5:31 PM", "email": "foodizone@gmail.com", "password": "foodizone", "userId": "45ae8a2e-cbee-4f40-bd7c-c23762fe5c91", "username": "abrar"}
  const email = myEmail.email;
  const myID = myEmail.userId;
  // console.log('myID__', myID);

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

  const goOneUserChat = user => {
    navigation.navigate(stackscreens.userOneChat, {
      clientID: user.userId,
      myID: myID,
    });
  };

  // render item chats 2

  const renderItem = ({item}) => {
    // console.log('Item11:___:\n\n', item.userId);
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => goOneUserChat(item)}>
        <Smcard style={{...styles.smcard, ...styles.flexApply}}>
          <View style={{...styles.bikeContainer}}>
            <EvilIcons name="user" size={55} color={mycolors.dgrey} />
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
      <AppText style={styles.headerText}>Welcome to User Chatting</AppText>
      {isSelected === 0 && (
        <FlatList
          contentContainerStyle={{paddingBottom: respHeight(14)}}
          data={fireStoreUsres}
          renderItem={renderItem}
        />
      )}

      <View style={styles.bottomContainer}>
        {userdata.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
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
    // marginHorizontal: respWidth(1.5),
    paddingVertical: respHeight(3),
    padding: 10,
    borderRadius: 3,
    backgroundColor: mycolors.whitelight,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 14,
    paddingHorizontal: 5,
    color: mycolors.silk,
  },
  primaryText: {
    fontSize: scale(16),
    // paddingHorizontal: respWidth(3),
    // marginVertical: respHeight(1),
    color: mycolors.black,
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
