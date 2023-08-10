import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  AppRegistry,
} from 'react-native';

import Route from './src/navigations/Routes/route';
import {persiststore, store} from './src/Redux/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ApiProvider} from '@reduxjs/toolkit/dist/query/react';
import {foodProductsApi} from './src/Redux/rtxQuery/apiSliceProducts';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persiststore}>
        {/* <ApiProvider api={foodProductsApi}> */}
        <Route />
        {/* </ApiProvider> */}
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

AppRegistry.registerComponent('foodizone', () => App);

export default App;
