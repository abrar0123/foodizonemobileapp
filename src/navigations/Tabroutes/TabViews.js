import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mycolors from '../../styles/mycolors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import stackscreens from '../../constants/stackscreens';
import imagesPath from '../../constants/imagesPath';

const renderScreens = [
    {
        id: 1,
        screenName: stackscreens.home,
        name: 'Dashbaoard',
        icon0: <Image
            source={imagesPath.c}
            style={{
                width: 18, height: 18, tintColor: mycolors.grey
            }}
        />,
        icon: <Image
            source={imagesPath.c}
            style={{
                width: 18, height: 18, tintColor: mycolors.white
            }}
        />

    },
    {
        id: 2,
        name: 'Watch',
        screenName: stackscreens.mall,
        icon0: <Image
            source={imagesPath.b}
            style={{
                width: 18, height: 18, tintColor: mycolors.grey
            }}
        />,
        icon: <Image
            source={imagesPath.b}
            style={{
                width: 18, height: 18, tintColor: mycolors.white
            }}
        />
    },
    {
        id: 3,
        name: 'Media ',

        screenName: stackscreens.testSc,
        icon0: <Image
            source={imagesPath.a}
            style={{
                width: 18, height: 18, tintColor: mycolors.grey
            }}
        />,
        icon: <Image
            source={imagesPath.a}
            style={{
                width: 18, height: 18, tintColor: mycolors.white
            }}
        />
    },
    {
        id: 4,
        screenName: stackscreens.testSc,
        name: 'More',

        icon0: <Image
            source={imagesPath.d}
            style={{
                width: 24, height: 24, tintColor: mycolors.grey
            }}
        />,
        icon: <Image
            source={imagesPath.d}
            style={{
                width: 24, height: 24, tintColor: mycolors.white
            }}
        />
    },

];

const TabViews = ({ state }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.bottomBarParent}>
            {renderScreens.map((item, index) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        key={index}
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate(item.screenName)}>
                        {state?.index === index ? item.icon : item.icon0}
                        <Text style={{ fontSize: 10, marginTop: 6, }}>{item.name}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    imagestyle: {
        width: 18,
        height: 18,
    },
    bottomBarParent: {
        backgroundColor: '#2E2739',
        height: 75,
        paddingVertical: 15,
        paddingHorizontal: 18,
        color: mycolors.white,
        // marginTop: 10,
        // marginBottom: 27,
        // marginHorizontal: 13,
        borderTopRightRadius: 27,
        // borderRadius: 27,
        borderTopLeftRadius: 27,


        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-around',

        // applying shadow properties
        shadowColor: mycolors.black,
        shadowRadius: 2,
        shadowOpacity: 0.18,
        elevation: 3,
        shadowOffset: {
            height: 5,
            width: 5,
        },
    },
});


export default TabViews;
