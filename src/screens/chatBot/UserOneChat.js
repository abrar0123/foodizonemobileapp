import React from 'react';
import {View, StyleSheet, Platform, StatusBar, Image} from 'react-native';
import AppText from '../../components/UI/AppText';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {respHeight, respWidth} from '../../components/responsiveness/RespHeight';
import mycolors from '../../styles/mycolors';
import {useEffect} from 'react';
import {useState} from 'react';
import {addDoc, collection} from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import imagespath from '../../constants/imagesPath';
import Feather from 'react-native-vector-icons/Feather';

import {DB} from '../../firebase_Configue';
import {useCallback} from 'react';
import moment from 'moment/moment';

const UserOneChat = ({route}) => {
  const [myMessage, setmyMessage] = useState([]);
  const mdate = moment().format('lll');

  const {clientID, myID} = route.params;
  const date = Date.parse(new Date());

  // console.log('myID___:', myID, 'clientID___:', clientID);

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
      .collection('vbtAllChats')
      .doc(myID + clientID)
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

  // console.log('messages___\t', myMessage);
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
    // firestore()
    //   .collection('vbtUserChats')
    //   .doc('123456')
    //   .collection('messages')
    //   .add(fireStoreMessage);
    // client side
    firestore()
      .collection('vbtAllChats')
      .doc(myID + clientID)
      .collection('messages')
      .add(fireStoreMessage);

    // whole chats
    firestore()
      .collection('vbtAllChats')
      .doc(clientID + myID)
      .collection('messages')
      .add(fireStoreMessage);

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
      <AppText>Welcome to One User Chat 1</AppText>
      {/* <AppText>{userID}</AppText> */}
      <GiftedChat
        messages={myMessage}
        onSend={message => onSend(message)}
        user={{
          _id: myID,
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={styles.renderInput}></InputToolbar>
          );
        }}
        alwaysShowSend
        renderSend={props => {
          return (
            <View style={styles.renderSendStyle}>
              <Feather name="paperclip" size={25} color={mycolors.silk} />
              <Feather name="image" size={27} color={mycolors.silk} />

              <Send {...props} containerStyle={{justifyContent: 'center'}}>
                <Feather name="send" size={30} color={mycolors.silk} />
              </Send>
            </View>
          );
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
  renderSendStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // justifyContent: 'center',
  },
  renderInput: {
    backgroundColor: mycolors.lightgrey,
    marginVertical: respHeight(2),
    marginHorizontal: respWidth(2),
    borderRadius: respHeight(4),
    paddingRight: respHeight(2),
  },
});
export default UserOneChat;
