import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
} from 'react-native';
import { respHeight, respWidth } from '../../../components/responsiveness/RespHeight';
import { moderateScale, scale } from 'react-native-size-matters';
import imagesPath from '../../../constants/imagesPath';
import { useNavigation } from '@react-navigation/native';
import stackscreens from '../../../constants/stackscreens';

export const TicketDetails = ({ route }) => {
    const { oneFood } = route.params;
    const [selectedDate, setSelectedDate] = useState('15 June');
    const [selectedTime, setSelectedTime] = useState('12:30');
    const navigation = useNavigation();

    const dates = ['15 June', '16 June', '17 June', '18 June', '19 June'];
    const timeSlots = [
        { time: '12:30', hall: 'Cinetech + Hall 1', price: '50$', bonus: '2500' },
        { time: '13:30', hall: 'Cinetech + Hall 2', price: '75$', bonus: '3000' },
        { time: '15:00', hall: 'Hall 3', price: '60$', bonus: '2000' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={imagesPath.arrowBack}
                        style={{ width: 18, height: 18, tintColor: 'black', marginRight: 10, }}
                    />
                </TouchableOpacity>
                <View style={{ ...styles.colStyle, gap: 5, alignItems: 'center' }}>

                    <Text style={styles.titleText1}>{oneFood.original_title}</Text>
                    <Text style={styles.titleText2}>In Theaters{oneFood.release_date}</Text>
                </View>


            </View>
            <View style={{ padding: 16, marginTop: 70 }}>

                {/* Dates */}
                <Text style={{ ...styles.title, color: 'black', width: respWidth(30) }} numberOfLines={1}>
                    Date
                </Text>
                <FlatList
                    data={dates}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedDate(item)}
                            style={[
                                styles.dateBtn,
                                selectedDate === item && styles.selectedDateBtn,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dateText,
                                    selectedDate === item && styles.selectedDateText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Time Slots */}
                <FlatList
                    data={timeSlots}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingVertical: 20 }}
                    renderItem={({ item }) => (
                        <View style={styles.colStyle}>
                            <View style={styles.rowStyle}>
                                <Text style={{ ...styles.title, color: 'black', }}>{item.time}</Text>
                                <Text style={styles.hall}>{item.hall}</Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.timeCard,
                                    selectedTime === item.time && styles.selectedTimeCard,
                                ]}
                                onPress={() => setSelectedTime(item.time)}
                            >

                                <Image
                                    source={imagesPath.seat}
                                    style={styles.seatingChart}
                                    resizeMode="contain"
                                />

                            </TouchableOpacity>

                            <Text style={styles.priceText}>
                                From <Text style={styles.bold}>{item.price}</Text> or{' '}
                                <Text style={styles.bold}>{item.bonus} bonus</Text>
                            </Text>
                        </View>
                    )}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 30, right: respHeight(3) }}>
                <TouchableOpacity style={styles.getTickets}
                    onPress={() => navigation.navigate(stackscreens.ticketCheckout, { oneFood: oneFood, details: { selectedDate, selectedTime } })}>
                    <Text style={styles.getTicketsText}>Select Seats</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#F2F2F6',
    },
    title: {
        fontSize: scale(14),
        paddingHorizontal: respWidth(0.5),
        fontWeight: '500',
        color: '#FFFFFF',
    },
    titleText: {
        color: '#000000',
        fontSize: 16,
        // fontWeight: 'bold',
        // flex: 1,
    },
    titleText1: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        // flex: 1,
    }, titleText2: {
        color: '#61C3F2',
        fontSize: 12,
        // fontWeight: 'bold',
        // flex: 1,
    },
    colStyle: {
        flexDirection: 'column', gap: 10, alignItems: 'flex-start'
    },
    rowStyle: {
        flexDirection: 'row', alignItems: 'center', gap: 5
    },
    getTickets: {
        backgroundColor: '#61C3F2',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: respWidth(85),
        marginBottom: 10,
        marginTop: 10,
    },
    getTicketsText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,

        textAlign: 'center'
    },
    topContainer: {
        flexDirection: 'row', height: respHeight(15), paddingHorizontal: 20, paddingTop: 40, backgroundColor: '#ffffff',
        marginTop: 20,
        alignItems: 'baseline', justifyContent: 'flex-start', gap: respWidth(16), paddingVertical: moderateScale(10),
    },
    dateBtn: {
        backgroundColor: '#A6A6A61A',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        height: 40,
    },
    selectedDateBtn: {
        backgroundColor: '#61C3F2',
    },
    dateText: {
        color: '#000',
        fontWeight: '500',
    },
    selectedDateText: {
        color: '#fff',
        fontWeight: '700',
    },
    timeCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 14,
        padding: 10,
        marginRight: 15,
        width: 200,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    selectedTimeCard: {
        borderColor: '#61C3F2',
    },
    time: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    hall: {
        fontSize: 12,
        color: '#666',
        // marginBottom: 10,

    },
    seatingChart: {
        width: 160,
        height: 100,
        marginBottom: 10,
    },
    priceText: {
        fontSize: 13,
        marginStart: 10,
        color: '#555',
    },
    bold: {
        fontWeight: 'bold',
        color: '#000',
    },
});


