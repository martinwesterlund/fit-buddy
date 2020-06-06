import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, ScrollView, View, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker'
import RNPickerSelect from 'react-native-picker-select'
import Background from '../components/Background'
import { FontAwesome } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'

function Post() {
    
    //Data to send to db
    const [newMarker, setNewMarker] = useState({ longitude: null, latitude: null })
    const [date, setDate] = useState(new Date());
    const [activity, setActivity] = useState()
    const [description, setDescription] = useState()
    const [city, setCity] = useState()
    const [duration, setDuration] = useState()
    const [limit, setLimit] = useState()

    //Other consts
    const [location, setLocation] = useState()
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateString, setDateString] = useState()
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

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location)
        })();

    };

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
        console.log(currentDate.getMinutes().toString().length)
        setDateString(`${currentDate.getDate()} ${months[currentDate.getMonth()]}, ${currentDate.getFullYear()}`)
        setTimeString(`${currentDate.getHours()}:${currentDate.getMinutes().toString().length > 1 ? currentDate.getMinutes() : '0' + currentDate.getMinutes()}`)
    };

    return (
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
                                        title={'Hejsan'}>
                                    </Marker>)}
                            </MapView>
                            : <View style={styles.mapStyle}><Text>Hämtar karta...</Text></View>}
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
                                placeholder={{ label: 'Välj aktivitet' }}
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: 'Löpning', value: 'running' },
                                    { label: 'Promenad', value: 'walking' },
                                    { label: 'Padel', value: 'padel' },
                                    { label: 'Fotboll', value: 'football' },
                                    { label: 'Simning', value: 'swimming' },
                                    { label: 'Frisbeegolf', value: 'discgolf' },
                                    { label: 'Övrigt', value: 'other' }
                                ]}
                            />
                            <Text style={styles.text}>Beskrivning</Text>
                            <TextInput
                                multiline={true}
                                style={styles.inputMultiline}
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
                                placeholder={{ label: 'Välj stad' }}
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: 'Göteborg', value: 'goteborg' },
                                    { label: 'Stockholm', value: 'stockholm' },
                                    { label: 'Malmö', value: 'malmo' }
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
                                placeholder={{ label: 'Välj längd på eventet' }}
                                onValueChange={(value) => console.log(value)}
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
                                numeric
                                keyboardType={"number-pad"}
                                style={styles.input}
                            />
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            setEvents([{
                                id: uuidv4(),
                                date: date,
                                activity: activity,
                                description: description,
                                city: city,
                                duration: duration,
                                limit: limit,
                                attendees: null
                            }, ...events])
                        }}>
                            <Text style={styles.registerText}>Skapa event</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
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
    mapStyle: {
        width: Dimensions.get('window').width - 50,
        height: Dimensions.get('window').height - 400,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
        backgroundColor: 'lightblue',
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
      registerText: {
        fontSize: 16,
        textAlign: 'center'
      },
});

export default Post