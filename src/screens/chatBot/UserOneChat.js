import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import AppText from '../../components/UI/AppText';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {respWidth} from '../../components/responsiveness/RespHeight';
import mycolors from '../../styles/mycolors';
import {useEffect} from 'react';
import {useState} from 'react';
import {addDoc, collection} from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';

import {DB} from '../../firebase_Configue';
import {useCallback} from 'react';
import moment from 'moment/moment';

const UserOneChat = ({route}) => {
  const [myMessage, setmyMessage] = useState([]);
  const mdate = moment().format('lll');

  const {clientID, myID} = route.params;
  const date = Date.parse(new Date());

  // console.log('userID__', clientID, 'myID___', myID);

  const sendHandler = async messageArray => {
    // const msg = messageArray[0];
    // console.log('msg__:\n', msg);

    setmyMessage(previousMessage =>
      GiftedChat.append(previousMessage, messageArray),
    );
    console.log('messages345__:', messageArray, 'next\n\n', myMessage[0]);

    const myCollection = await collection(DB, 'VBTChats');
    try {
      const insertMSG = await addDoc(myCollection, messageArray[0]);
      insertMSG
        .then(e => console.log('resolve', e))
        .catch(e => console.log('reject', e));
    } catch (error) {
      console.log('error_:', error);
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('vbtUserChats')
      .doc('123456')
      .collection('messages')
      .orderBy('createdAt', 'desc');

    subscriber.onSnapshot(querysnapshot => {
      const allMessage = querysnapshot.docs.map(item => {
        // console.log('receivedAt__12:\n\n', item.data());
        return {...item.data(), createdAt: Date.parse(new Date())};
      });

      console.log('receivedAt__:\n\n', allMessage);
      setmyMessage(allMessage);
    });
  }, []);

  console.log('messages___\t', myMessage);
  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const fireStoreMessage = {
      ...msg,
      sendBy: myID,
      sendTo: clientID,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    console.log('fireStoreMessage____:\n', fireStoreMessage);
    // user side messages savd.
    firestore()
      .collection('vbtUserChats')
      .doc('123456')
      .collection('messages')
      .add(fireStoreMessage);
    // client side
    // firestore()
    //   .collection('vbtUserChats1')
    //   .doc('123456')
    //   .collection('messages')
    //   .add(fireStoreMessage);

    setmyMessage(previousMessages => {
      return GiftedChat.append(previousMessages, messages);
    });
  }, []);

  //

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: mycolors.cyan,
            color: mycolors.white,
          },
        }}
      />
    );
  };
  //   console.log('messages__:', myMessage);
  return (
    <View style={styles.chat}>
      <AppText>Welcome to One User Chat</AppText>
      {/* <AppText>{userID}</AppText> */}
      <GiftedChat
        messages={myMessage}
        onSend={message => onSend(message)}
        user={{
          _id: myID,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
    paddingHorizontal: respWidth(2.5),
    backgroundColor: mycolors.white,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: mycolors.white,
    // alignSelf:'center'
  },
  primaryText: {
    fontSize: 16,
    color: mycolors.white,
    marginVertical: 5,
  },
});
export default UserOneChat;
