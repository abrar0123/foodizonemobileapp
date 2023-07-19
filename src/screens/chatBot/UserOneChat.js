import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../components/UI/AppText';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {
  respHeight,
  respWidth,
} from '../../components/responsiveness/RespHeight';
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
import imagesPath from '../../constants/imagesPath';

const UserOneChat = ({route}) => {
  const [myMessage, setmyMessage] = useState([]);
  const mdate = moment().format('lll');

  const {clientID, myID} = route.params;
  const date = Date.parse(new Date());

  // console.log('myID___:', myID, 'clientID___:', clientID);

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

  // useEffect(() => {
  //   setmyMessage([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       avatar: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png',
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png',
  //       },
  //     },
  //   ]);
  // }, []);

  // console.log('messages___\t', myMessage);
  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const fireStoreMessage = {
      ...msg,
      sendBy: myID,
      sendTo: clientID,
      // image: imagesPath.profile,
      avatar: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png',
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    // console.log('fireStoreMessage____:\n', fireStoreMessage);

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
      <AppText style={styles.msgText}>Messages </AppText>
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
              <TouchableOpacity>
                <Feather name="paperclip" size={25} color={mycolors.silk} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="image" size={27} color={mycolors.silk} />
              </TouchableOpacity>

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
    // paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
    paddingHorizontal: respWidth(2),
    backgroundColor: mycolors.white,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: mycolors.white,
    // alignSelf:'center'
  },
  msgText: {
    marginVertical: respHeight(2),
    fontSize: 22,
    fontWeight: 'bold',
    color: mycolors.silk,
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
    gap: 15,
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
