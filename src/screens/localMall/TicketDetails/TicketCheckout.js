import { useEffect, useState } from 'react';
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
import { moderateScale, } from 'react-native-size-matters';
import imagesPath from '../../../constants/imagesPath';
import { useNavigation } from '@react-navigation/native';
import stackscreens from '../../../constants/stackscreens';

export const TicketCheckout = ({ route }) => {
    const { oneFood, details } = route.params;
    const [selectedDate, setSelectedDate] = useState('5 Mar');
    const [selectedTime, setSelectedTime] = useState('12:30');
    const navigation = useNavigation();

    const timeSlots = [
        { time: '12:30', hall: 'Cinetech + Hall 1', price: '50$', bonus: '2500' },
        { time: '13:30', hall: 'Cinetech + Hall 2', price: '75$', bonus: '3000' },
        { time: '15:00', hall: 'Hall 3', price: '60$', bonus: '2000' },
    ];

    const selectedSlot = timeSlots.find(slot => slot.time === selectedTime);



    useEffect(() => {
        setSelectedDate(details.selectedDate);
        setSelectedTime(details.selectedTime);
    }, [])

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



                <Image
                    source={imagesPath.seat}
                    style={styles.seatingChart}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.container2}>
                {/* Legends */}
                <View style={styles.legendRow}>
                    <Legend color="#F4C430" label="Selected" />
                    <Legend color="#ccc" label="Not available" />

                </View>
                <View style={styles.legendRow}>

                    <Legend color="#6A5ACD" label="VIP (150$)" />
                    <Legend color="#50b5ff" label="Regular (50 $)" />
                </View>

                {/* Selected Seat */}
                {/* {selectedSeats.length > 0 && ( */}
                <View style={styles.seatInfo}>
                    <Text style={styles.seatText}>
                        {/* {selectedSeats[0].number} / {selectedSeats[0].row} row */}
                        4 / 3 row
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.clear}>×</Text>
                    </TouchableOpacity>
                </View>
                {/* )} */}

                {/* Price and Pay Button */}
                <View style={styles.bottomRow}>
                    <View style={styles.priceBox}>
                        <Text style={styles.totalPrice}>Total Price</Text>
                        <Text style={styles.price}>${selectedSlot.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.payBtn}
                        onPress={() => navigation.navigate(stackscreens.home)}
                    >
                        <Text style={styles.payText}>Proceed to pay</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};

const Legend = ({ color, label }) => (
    <View style={styles.legend}>
        <View style={[styles.legendColor, { backgroundColor: color }]} />
        <Text style={styles.legendLabel}>{label}</Text>
    </View>
);


const styles = StyleSheet.create({
    container2: {
        backgroundColor: '#fff',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        paddingBottom: 100
        // elevation: 10,
    },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        flexWrap: 'wrap',
        // gap: respWidth(5)
    },
    legend: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 4,
        marginRight: 6,
    },
    legendLabel: {
        fontSize: 12,
        color: '#555',
    },
    seatInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f4f7',
        paddingLeft: 10,
        borderRadius: 10,
        width: 120,
        marginBottom: 15,
    },
    seatText: {
        fontWeight: 'bold',
        fontSize: 13,
        color: 'black',
        marginRight: 6,
    },
    clear: {
        color: '#888',
        fontSize: 26,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: respHeight(15),
        // position: 'absolute',
        // bottom: 0


    },
    priceBox: {
        alignItems: 'flex-start',
        backgroundColor: '#A6A6A61A',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10
    },
    totalPrice: {
        color: '#999',
        fontSize: 13,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    payBtn: {
        backgroundColor: '#61C3F2',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        width: '60%'
    },
    payText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center'
    },

    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#F2F2F6',
    },
    // title: {
    //     fontSize: scale(14),
    //     paddingHorizontal: respWidth(0.5),
    //     fontWeight: '500',
    //     color: '#FFFFFF',
    // },
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
        backgroundColor: '#3EB5FF',
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
        width: '100%',
        height: 200,
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


