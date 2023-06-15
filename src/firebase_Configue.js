import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA4jTy7mZ_WYjG7juyHpzN7y1HBan_O1ik',
  authDomain: 'foodizonernapp.firebaseapp.com',
  projectId: 'foodizonernapp',
  storageBucket: 'foodizonernapp.appspot.com',
  messagingSenderId: '673903756842',
  appId: '1:673903756842:web:f2e70a36f4ffd93c712553',
};

const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const authApiKey = 'AIzaSyA4jTy7mZ_WYjG7juyHpzN7y1HBan_O1ik';
export const apiEndpoints='https://identitytoolkit.googleapis.com/v1';
