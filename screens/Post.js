import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, View, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker'
import RNPickerSelect from 'react-native-picker-select'
import Background from '../components/Background'
import { FontAwesome } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'
import Localhost from '../components/Localhost'
import Context from '../Context/Context'
import { useObserver } from 'mobx-react-lite'



function Post() {
    const store = useContext(Context)
    //Data to send to db
    const [newMarker, setNewMarker] = useState({ longitude: null, latitude: null })
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState()
    const [dateStringSmall, setDateStringSmall] = useState()
    const [activity, setActivity] = useState()
    const [description, setDescription] = useState()
    const [city, setCity] = useState()
    const [duration, setDuration] = useState()
    const [limit, setLimit] = useState()

    //Component consts
    const [location, setLocation] = useState()
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [timeString, setTimeString] = useState()
    const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']

    //Get users location
    useEffect(() => {
        getLocationAsync()
    }, [])

    getLocationAsync = async () => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setLocation(location);
        })();

    };



    const createEvent = () => {
        console.log(date)
        fetch(`${Localhost}:3000/createpostmob`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: activity,
                description: description,
                city: city,
                timestamp: date,
                duration: duration,
                activity: activity,
                attendees: [],
                limit: limit,
                counter: 0,
                creator: store.user.username,
                longitude: newMarker.longitude,
                latitude: newMarker.latitude
            })
        })
            .then(result => {
                if (result.status === 200) {
                    console.log('Eventet skapat')
                    clearFields()
                }
                else {
                    console.log('Något gick fel')
                }
            })
    }

    const clearFields = () => {
        setNewMarker({ longitude: null, latitude: null })
        setDate(new Date())
        setActivity(null)
        setDateString(null)
        setDateStringSmall(null)
        setDescription(null)
        setCity(null)
        setDuration(null)
        setLimit(null)
        setMode('date')
        setShow(false)
        setTimeString(null)

    }

    //Date-time-picker 
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateStringSmall(`${currentDate.getDate()} ${months[currentDate.getMonth()]}`)
        setDateString(`${currentDate.getDate()} ${months[currentDate.getMonth()]}, ${currentDate.getFullYear()}`)
        setTimeString(`${currentDate.getHours()}.${currentDate.getMinutes().toString().length > 1 ? currentDate.getMinutes() : '0' + currentDate.getMinutes()}`)
    };

    return useObserver(() => (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>Skapa ett nytt event</Text>
            </View>
            <SafeAreaView style={styles.container}>
                <Background />
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView style={styles.scrollView}>


                        <View style={styles.content}>
                            {location ?
                                <View style={styles.mapContainer}>
                                    {!newMarker.longitude &&
                                        <Text style={styles.mapInfo}>Välj plats på kartan</Text>
                                    }
                                    <MapView provider='google'
                                        showsUserLocation={true}
                                        onPress={(event) => setNewMarker(event.nativeEvent.coordinate)}
                                        initialRegion={{
                                            //57.719291, 12.003977
                                            latitude: location.coords.latitude,
                                            longitude: location.coords.longitude,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                        style={styles.mapStyle}

                                    >
                                        {newMarker.latitude !== null && (
                                            <Marker
                                                coordinate={{ latitude: newMarker.latitude, longitude: newMarker.longitude }}
                                                title={'Ditt event'}>
                                            </Marker>)}
                                    </MapView>
                                </View>
                                : <View style={[styles.mapStyle, styles.loadingContainer, styles.horizontal]}>
                                    <Text style={styles.text}>Laddar karta...</Text>
                                    <ActivityIndicator size="large" color="#68bed8" />
                                </View>
                            }

                            <View style={styles.dateTime}>
                                <View style={styles.calendarContainer} >
                                    <FontAwesome name='calendar' size={30} color='#000' onPress={showDatepicker} />
                                </View>
                                <View style={styles.calendarContainer} >
                                    <Ionicons name="md-time" size={30} color="#000" onPress={showTimepicker} />
                                </View>
                            </View>
                            {show && (
                                <DateTimePicker

                                    minuteInterval={5}
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={date}
                                    mode={mode}
                                    textColor="yellow"
                                    is24Hour={true}
                                    display='default'
                                    onChange={onChange}
                                    minimumDate={new Date(Date.now())}
                                />
                            )}
                            <View style={styles.dateTime}>
                                <View style={styles.timeDisplay}><Text>{dateString}</Text></View>
                                <View style={styles.timeDisplay}><Text>{timeString}</Text></View>
                            </View>
                            <View style={styles.form}>
                                <Text style={styles.text}>Aktivitet</Text>
                                <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    style={{
                                        inputAndroid: {
                                            backgroundColor: 'white',
                                            color: 'black',
                                            borderWidth: 0,
                                            borderColor: 'black',
                                            padding: 5,
                                            paddingLeft: 15,
                                            borderRadius: 5
                                        }
                                    }}
                                    value={activity}
                                    placeholder={{ label: 'Välj aktivitet' }}
                                    onValueChange={(value) => setActivity(value)}
                                    items={[
                                        { label: 'Bandy', value: 'Bandy' },
                                        { label: 'Cykling', value: 'Cykling' },
                                        { label: 'Fotboll', value: 'Fotboll' },
                                        { label: 'Gym', value: 'Gym' },
                                        { label: 'Klättring', value: 'Klättring' },
                                        { label: 'Löpning', value: 'Löpning' },
                                        { label: 'Simning', value: 'Simning' },
                                        { label: 'Tennis', value: 'Tennis' },
                                        { label: 'Övrigt', value: 'Övrigt' }

                                    ]}
                                />
                                <Text style={styles.text}>Beskrivning</Text>
                                <TextInput
                                    multiline={true}
                                    style={styles.inputMultiline}
                                    onChangeText={text => setDescription(text)}
                                    value={description}
                                />



                                <Text style={styles.text}>Plats</Text>
                                <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    style={{
                                        inputAndroid: {
                                            backgroundColor: 'white',
                                            color: 'black',
                                            borderWidth: 0,
                                            borderColor: 'black',
                                            padding: 5,
                                            paddingLeft: 15,
                                            borderRadius: 5
                                        }
                                    }}
                                    value={city}
                                    placeholder={{ label: 'Välj stad' }}
                                    onValueChange={(value) => setCity(value)}
                                    items={[
                                        { label: 'Göteborg', value: 'Göteborg' },
                                        { label: 'Stockholm', value: 'Stockholm' },
                                        { label: 'Malmö', value: 'Malmö' }
                                    ]}
                                />
                                <Text style={styles.text}>Längd</Text>
                                <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    style={{
                                        inputAndroid: {
                                            backgroundColor: 'white',
                                            color: 'black',
                                            borderWidth: 0,
                                            borderColor: 'black',
                                            padding: 5,
                                            paddingLeft: 15,
                                            borderRadius: 5
                                        }
                                    }}
                                    value={duration}
                                    placeholder={{ label: 'Välj längd på eventet' }}
                                    onValueChange={(value) => setDuration(value)}
                                    items={[
                                        { label: '30 min', value: '30' },
                                        { label: '45 min', value: '45' },
                                        { label: '60 min', value: '60' },
                                        { label: '75 min', value: '75' },
                                        { label: '90 min', value: '90' },
                                        { label: '120 min', value: '120' },
                                        { label: '180 min', value: '180' }
                                    ]}
                                />
                                <Text style={styles.text}>Max antal deltagare</Text>
                                <TextInput
                                    value={limit}
                                    keyboardType={"number-pad"}
                                    style={styles.input}
                                    onChangeText={value => setLimit(value)}
                                />
                            </View>
                            <TouchableOpacity disabled={!store.loggedIn} style={!store.loggedIn ? styles.inactiveBtn : styles.btn} onPress={() => createEvent()}>
                                <Text style={styles.btnText}>Skapa event</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    ));
}

const styles = StyleSheet.create({
    header: {
        top: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#68bed8',
        width: Dimensions.get('window').width,
        borderBottomWidth: 0,
        // marginBottom: 5,
        zIndex: 1
    },
    headerTxt: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    scrollView: {
        backgroundColor: 'transparent'
    },

    content: {
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
    },
    btnText: {
        fontSize: 16,
        color: '#fff'
    },
    inputMultiline: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 0,
        paddingLeft: 15,
        width: 250,
        borderRadius: 5,
        maxHeight: 75,
        textAlignVertical: 'top',
        padding: 10,
    },
    mapContainer: {
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapStyle: {
        width: Dimensions.get('window').width - 50,
        height: Dimensions.get('window').height - 400,

        justifyContent: 'center',
        alignItems: 'center'
    },
    mapInfo: {
        position: 'absolute',
        fontSize: 24,
        color: '#fff',
        zIndex: 3,
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 2
    },
    dateTime: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    calendarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        width: 50,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 5,
        borderRadius: 25
    },
    timeDisplay: {
        width: 100,
        alignItems: 'center',
        margin: 0
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 0,
        padding: 5,
        paddingLeft: 15,
        width: 250,
        borderRadius: 5
    },
    btn: {
        backgroundColor: '#68bed8',
        width: 250,
        height: 50,
        marginTop: 12,
        marginBottom: 50,
        padding: 20,
        borderWidth: 0,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    inactiveBtn: {
        // backgroundColor: '#68bed8',
        backgroundColor: '#e36565',
        width: 250,
        height: 50,
        marginTop: 30,
        marginBottom: 30,
        padding: 20,
        borderWidth: 0,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        opacity: 0.3
    },
    registerText: {
        fontSize: 16,
        textAlign: 'center'
    },
    loadingContainer: {
        justifyContent: 'center',

    },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
    },
});

export default Post