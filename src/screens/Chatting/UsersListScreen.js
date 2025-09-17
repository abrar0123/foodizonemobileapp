import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
// import { supabase } from '../../utils/supabaseClient';
import {chatClient} from '../../utils/streamClient';
import {useDispatch, useSelector} from 'react-redux';
import { authLogout } from '../../Redux/authSlice';
import messaging from '@react-native-firebase/messaging';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserListScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const {login} = useSelector((state) => state.auth);
  const id = login?.user?.id;
  const dispatch = useDispatch();
  
  const SUPABASE_URL = 'https://avacxbqlaslsgpnlrmhp.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2YWN4YnFsYXNsc2dwbmxybWhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0ODg2MywiZXhwIjoyMDY0NDI0ODYzfQ.qeezwQeUxgpdDMoRamwTh8DBMtxDup7GjUg5-dWvU28';
  
   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY,{
      auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
  });
  
  useEffect(() => {
    const loadUsers = async () => {
    //   setCurrentUserId(id);
    const { data: session } = await supabase.auth.getSession();
    const myId = session?.session?.user?.id;

    setCurrentUserId(myId);

      const {data, error} = await supabase
        .from('profiles') 
        .select('id, email');
        
        if (data) {
            const filteredUsers = data.filter(user => user.id !== myId);
            setUsers(filteredUsers);
          }
    };

    loadUsers();
  }, []);



async function getDeviceToken() {
  const authStatus = await messaging().requestPermission();
  if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    const token = await messaging().getToken();
    console.log("token : ",token);
    
    // Save token to your backend (Supabase)
    await supabase.from('profiles').upsert({ id:id, fcm_token: token });
  }
}

useEffect(()=>{
    getDeviceToken();
},[])

  const startChat = async (otherUserId ) => {
    navigation.navigate('tabRoutes',);

    try {
        const channel = chatClient.channel('messaging', {
            members: [currentUserId, otherUserId],
          });
          await channel.watch(); // creates if not exists
    // console.log("startChat : ",channel);
      
    } catch (error) {
    console.log("startChat error : ",error);
    }
    
   
  };

  const authLogout1 = ()=>{
    dispatch(authLogout(''));
  }

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>User List</Text>

    <TouchableOpacity style={styles.logoutBtn} onPress={authLogout1}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>

    {users.length < 1 ? (
      <Text style={styles.noUserText}>No users available</Text>
    ) : (
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => startChat(item.id)}
          >
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {item.email?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.emailText}>{item.email}</Text>
              {/* Optional: Add secondary info here */}
            </View>
          </TouchableOpacity>
        )}
      />
    )}
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f4f8',
      paddingHorizontal: 20,
      paddingTop: 30,
    },
    heading: {
      fontSize: 28,
      fontWeight: '700',
      color: '#333',
      marginBottom: 20,
      alignSelf: 'center',
    },
    logoutBtn: {
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
      alignSelf: 'center',
      marginBottom: 20,
      elevation: 2, // shadow for android
    },
    logoutText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
    noUserText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 18,
      color: '#999',
    },
    listContainer: {
      paddingBottom: 30,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 15,
      marginBottom: 15,
      borderRadius: 15,
      elevation: 3, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 5,
    },
    avatarPlaceholder: {
      backgroundColor: '#4CAF50',
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    avatarText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '700',
    },
    userInfo: {
      justifyContent: 'center',
    },
    emailText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
    },
  });