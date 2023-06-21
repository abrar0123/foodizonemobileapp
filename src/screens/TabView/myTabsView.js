import React from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import Smcard from '../../components/UI/SmallCard/smcard';
import AppText from '../../components/UI/AppText';
import mycolors from '../../styles/mycolors';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useState} from 'react';

// first activity

const First = () => (
  <View>
    <AppText>First here ...</AppText>
  </View>
);

// first second
const Second = () => (
  <View style={{flex: 1, backgroundColor: mycolors.jaman}} />
);

// first Third
const Third = () => (
  <View>
    <AppText>Third here ...</AppText>
  </View>
);

const renderScene = SceneMap({
  first: First,
  second: Second,
  third: Third,
});

const MyTabsView = () => {
  const [index, setindex] = useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'First Activity'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
  ]);

  const layout = useWindowDimensions();

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setindex}
      initialLayout={{width: layout.width}}
    />
  );
};

const styles = StyleSheet.create({
  parent: {
    padding: 15,
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

export default MyTabsView;
