import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Switch, Text, View, FlatList, Dimensions, RefreshControl, Modal, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import Context from '../Context/Context'
import CheckBox from '@react-native-community/checkbox';
import Background from '../components/Background'
import Constants from 'expo-constants';
import RNPickerSelect from 'react-native-picker-select'
import { FontAwesome } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useObserver } from 'mobx-react-lite'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'
import Localhost from '../components/Localhost';
import { ScrollView } from 'react-native-gesture-handler';

function Home() {
  const store = useContext(Context)

  const [location, setLocation] = useState()
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [eventModalVisible, setEventModalVisible] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
  const date = new Date()
  const today = `${date.getDate().toString()} ${months[date.getMonth()]}`

  useEffect(() => {
    getLocationAsync()
  }, [])

  useEffect(() => {
    loadEventsFromDatabase()
  }, [])

  const attendToEvent = (event) => {
    let att = JSON.parse(event.attendees)
    att.push({ "name": store.user.username })
    let att2 = JSON.stringify(att)
    console.log(event.counter)
    fetch(`${Localhost}:3000/attends`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        counter: event.counter + 1,
        attendees: att2,
        postId: event.postId
      })
    }).then(result => {
      if (result.status === 200) {
        console.log('Uppdatering lyckades')
        loadEventsFromDatabase()
        setEventModalVisible(!eventModalVisible)
      }
      else {
        console.log('Något gick fel')
      }
    })
  }

  const cancelParticipation = (event) => {
    let att = JSON.parse(event.attendees)
    let att2 = JSON.stringify(att.filter(attendee => attendee.name != store.user.username))
    fetch(`${Localhost}:3000/attends`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        counter: event.counter - 1,
        attendees: att2,
        postId: event.postId
      })
    }).then(result => {
      if (result.status === 200) {
        console.log('Uppdatering lyckades')
        loadEventsFromDatabase()
        setEventModalVisible(!eventModalVisible)
      }
      else {
        console.log('Något gick fel')
      }
    })
  }

  const getLocationAsync = async () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(location);
    })();
  };

  const loadEventsFromDatabase = () => {
    console.log('Hämtar från db')
    fetch(`${Localhost}:3000/posts`)
      .then(response => response.json())
      .then(result => {
        store.setEvents(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(`${Localhost}:3000/posts`)
      .then(response => response.json())
      .then(result => {
        store.setEvents(result)
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => setRefreshing(false))
  }, [refreshing]);

  const showEvent = id => {
    store.setMarkedEvent(id)
    setEventModalVisible(true)
  }
  
  const showMap = () => {
    setMapVisible(!mapVisible)
  }

  return useObserver(() => (
    <>
      {/* Header  */}
      <View style={styles.header}>
        <Text style={styles.todaysDate}>{today}</Text>
        <Text style={styles.headerTxt}>Aktiviteter</Text>
        <View style={styles.headerMap}>
          {!mapVisible ? <FontAwesome onPress={showMap} name='map-o' size={24} color='#fff' />
            : <Ionicons onPress={showMap} name="ios-list" size={30} color="#fff" />}
        </View>
        <View style={styles.headerSlide}><FontAwesome onPress={() => {
          setFilterModalVisible(true)
        }} name='sliders' size={24} color='#fff' /></View>
      </View>

      <View style={styles.screen}>
        <Background />
        {store.filteredEvents.length === 0 &&
          <View style={[styles.loadEventsContainer, styles.horizontal]}>
            <Text style={styles.box, styles.text}>Laddar aktiviteter</Text>
            <ActivityIndicator size="large" color="#68bed8" />
          </View>
        }

        {/* Visa lista med events */}
        {!mapVisible && store.filteredEvents ?
          <FlatList
            data={store.filteredEvents}
            renderItem={({ item }) =>

              <TouchableOpacity onPress={() => { showEvent(item.postId) }}>
                {store.filteredEventTypes.filter(type => type.type === item.activity).length > 0 &&
                  <View style={styles.box}>
                    <View style={styles.date}>
                      <Text style={styles.dateText}>{item.timestamp.substring(8, 10)} {months[Number(item.timestamp.substring(5, 7)) - 1]}</Text>
                    </View>
                    <Text style={styles.eventTime}>{item.timestamp.substring(11, 16)}</Text>
                    <Text style={styles.eventText}>{item.activity}, {item.duration} min</Text>
                    <Text style={styles.text}>{item.city}</Text>
                    <Text style={styles.text}>Skapad av: {item.creator}</Text>
                    <Text style={styles.text}>Bokade platser: {(JSON.parse(item.attendees)).length > 0 ? (JSON.parse(item.attendees)).length : 0}/{item.limit}</Text>
                    {(JSON.parse(item.attendees)).some(a => a.name === store.user.username) ?
                      <View style={styles.arrow}>
                        <Ionicons name="ios-checkmark-circle" size={30} color="lightgreen" />
                      </View>
                      :
                      <View style={styles.arrow}>
                        <Ionicons name="ios-arrow-dropright-circle" size={30} color="#68bed8" />
                      </View>}


                  </View>
                }
              </TouchableOpacity>}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            keyExtractor={item => item.postId}
          />

          // Eller kartan med events
          : <View>
            {location && store.filteredEvents ?
              <View style={styles.mapContainer}>
                <MapView provider='google'
                  showsUserLocation={true}
                  initialRegion={{
                    //57.719291, 12.003977
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  style={styles.mapStyle}

                >
                  {store.filteredEvents.map(event => (
                    event.latitude && store.filteredEventTypes.filter(type => type.type === event.activity).length > 0 && (
                      <Marker
                        coordinate={{ latitude: event.latitude, longitude: event.longitude }}
                        title={`${event.activity}, ${event.duration} min`}
                        description={`${event.date}, kl. ${event.time}`}
                        key={event.postId} onPress={() => { store.setMarkedEvent(event.postId) }}
                      />
                    )))
                  }
                </MapView>
              </View>
              : <View style={[styles.mapStyle, styles.loadingContainer, styles.horizontal]}>
                <Text style={styles.text}>Laddar karta...</Text>
                <ActivityIndicator size="large" color="#68bed8" />
              </View>}

            {/* Visar valt event under kartan  */}
            {store.markedEvent && ((store.cityFilter === undefined || store.cityFilter === null) || store.markedEvent.city === store.cityFilter) && store.filteredEventTypes.filter(type => type.type === store.markedEventInfo.activity).length > 0 ?
              <>
                <TouchableOpacity onPress={() => setEventModalVisible(true)}>
                  <View style={styles.box2}>
                    <View style={styles.date}>
                      <Text style={styles.dateText}>{store.markedEventInfo.timestamp.substring(8, 10)} {months[Number(store.markedEventInfo.timestamp.substring(5, 7)) - 1]}</Text>
                    </View>
                    <Text style={styles.eventTime}>{store.markedEventInfo.timestamp.substring(11, 16)}</Text>
                    <Text style={styles.eventText}>{store.markedEventInfo.activity}, {store.markedEventInfo.duration} min</Text>
                    <Text style={styles.text}>{store.markedEventInfo.city}</Text>
                    <Text style={styles.text}>Skapad av: {store.markedEventInfo.creator}</Text>
                    <Text style={styles.text}>Bokade platser: {(JSON.parse(store.markedEventInfo.attendees)).length > 0 ? (JSON.parse(store.markedEventInfo.attendees)).length : 0}/{store.markedEventInfo.limit}</Text>
                    {(JSON.parse(store.markedEventInfo.attendees)).some(a => a.name === store.user.username) ?
                      <View style={styles.arrow}>
                        <Ionicons name="ios-checkmark-circle" size={30} color="lightgreen" />
                      </View>
                      :
                      <View style={styles.arrow}>
                        <Ionicons name="ios-arrow-dropright-circle" size={30} color="#68bed8" />
                      </View>}

                  </View>
                </TouchableOpacity>
              </>
              : <View></View>
            }
          </View>}

      </View>
      {/* Modal med mer info om eventet  */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={eventModalVisible}
        onRequestClose={() => {
          console.log('Modal closing');
        }}>

        <View style={styles.modalContainer}>

          <View style={styles.modal}>

            <TouchableOpacity style={styles.closeBtn} onPress={() => {
              setEventModalVisible(!eventModalVisible);
            }}>
              <FontAwesome name='close' size={24} color='#fff' /></TouchableOpacity>
            {store.markedEvent && (
              <>
                <ScrollView style={styles.infoBox}>
                  <View style={styles.infoBoxContent}>
                    <Text style={styles.eventText}>{store.markedEventInfo.activity} med {store.markedEventInfo.creator} - {store.markedEventInfo.duration} min</Text>
                    <Text>{store.markedEventInfo.timestamp.substring(8, 10)} {months[Number(store.markedEventInfo.timestamp.substring(5, 7)) - 1]}, kl. {store.markedEventInfo.timestamp.substring(11, 16)}</Text>

                    <Text>{store.markedEventInfo.city}</Text>
                    <Text style={styles.description}>"{store.markedEventInfo.description}"</Text>
            <Text>creator: {store.markedEventInfo.creator}</Text>
                  </View>
                </ScrollView>
                <Text style={styles.eventText}>Bokade platser {(JSON.parse(store.markedEventInfo.attendees)).length > 0 ? (JSON.parse(store.markedEventInfo.attendees)).length : 0}/{store.markedEventInfo.limit}</Text>

                {(JSON.parse(store.markedEventInfo.attendees)).some(a => a.name === store.user.username) ?
                  <TouchableOpacity
                    disabled={!store.loggedIn || ((JSON.parse(store.markedEvent.attendees)).length >= store.markedEventInfo.limit && ((JSON.parse(store.markedEventInfo.attendees)).filter(a => a.name === store.user.username)).length === 0)}
                    style={!store.loggedIn || ((JSON.parse(store.markedEventInfo.attendees)).length >= store.markedEventInfo.limit && ((JSON.parse(store.markedEventInfo.attendees)).filter(a => a.name === store.user.username)).length === 0) ? styles.inactiveBtn : styles.unBookBtn}
                    onPress={() => cancelParticipation(store.markedEventInfo)}>
                    <Text style={styles.btnText}>Avboka din plats</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    disabled={!store.loggedIn || ((JSON.parse(store.markedEventInfo.attendees)).length >= store.markedEventInfo.limit || store.markedEventInfo.creator === store.user.username)}
                    style={!store.loggedIn || ((JSON.parse(store.markedEventInfo.attendees)).length >= store.markedEventInfo.limit || store.markedEventInfo.creator === store.user.username) ? styles.inactiveBtn : styles.regBtn}
                    onPress={() => attendToEvent(store.markedEventInfo)}>
                    <Text style={styles.btnText}>Boka en plats</Text>
                  </TouchableOpacity>}
              </>)}
          </View>
        </View>
      </Modal>

      {/* Filtrering modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          console.log('Modal closing');
        }}>

        <View style={styles.modalContainer}>

          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => {
              setFilterModalVisible(!filterModalVisible);
            }}><FontAwesome name='close' size={24} color='#fff' /></TouchableOpacity>

            <View>
              <Text style={styles.headerText}>Filtrering</Text>
              <Text style={styles.text}>Filtrera efter stad</Text>

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
                placeholder={{ label: 'Alla städer' }}
                onValueChange={(value) => store.setCityFilter(value)}
                value={store.cityFilter}
                items={[
                  { label: 'Göteborg', value: 'Göteborg' },
                  { label: 'Stockholm', value: 'Stockholm' },
                  { label: 'Malmö', value: 'Malmö' }
                ]}
              />
              <Text style={styles.text}>Filtrera efter aktivitet</Text>



              <View style={styles.checkboxesContainer}>

                {store.eventTypes.map(event =>
                  <View style={styles.optionContainer} key={event.id}>
                    <CheckBox
                      onValueChange={() => store.updateCheckbox(event.id)}
                      value={event.checked}
                    />
                    <Text>{event.type}</Text>
                  </View>)}
              </View>

              <TouchableOpacity
                style={styles.regBtn}
                onPress={() => {
                  setFilterModalVisible(!filterModalVisible);

                }}>

                <Text style={styles.btnText}>Tillbaka</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  ));
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // marginTop: Constants.statusBarHeight
  },
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
  todaysDate: {
    position: 'absolute',
    left: 20,
    color: '#fff',
    fontWeight: 'bold'

  },
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  headerMap: {
    color: '#fff',
    position: 'absolute',
    right: 70,
    padding: 10
  },
  headerSlide: {
    color: '#fff',
    position: 'absolute',
    right: 10,
    padding: 10
  },
  box: {
    width: Dimensions.get('window').width - 10,
    height: 130,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 5,
    padding: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#000',
    borderWidth: 0
  },
  box2: {
    width: Dimensions.get('window').width - 50,
    height: 130,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#000',
    borderWidth: 0
  },
  date: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#d9e2ff',

  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  eventText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  eventTime: {
    position: 'absolute',
    left: 20,
    top: 80,
    fontSize: 18,
    fontWeight: 'bold',
    width: 50
  },
  arrow: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  mapContainer: {
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    width: Dimensions.get('window').width - 48,
  },
  mapStyle: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height - 350,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000095'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 200,
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#abd9e7',
    borderRadius: 15
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 25
  },
  regBtn: {
    backgroundColor: '#68bed8',
    width: 250,
    height: 50,
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    borderWidth: 0,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  unBookBtn: {
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
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: '#fff'
  },
  text: {
    fontSize: 16,
  },
  btnText: {
    fontSize: 16,
    color: '#fff'
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
  checkboxesContainer: {
    maxHeight: 200,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'stretch'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoBox: {
    padding: 20,
    margin: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  infoBoxContent: {
    paddingBottom: 50
  },
  description: {
    fontStyle: 'italic',
    paddingTop: 10,
    paddingBottom: 20
  },
  loadingContainer: {
    justifyContent: 'center',

  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loadEventsContainer: {
    width: Dimensions.get('window').width
  }
});

export default Home