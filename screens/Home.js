import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, RefreshControl } from 'react-native';
import Context from '../Context/Context'
import Background from '../components/Background'
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Home() {

  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)

  const getEvents = () => {
    setEvents([
      {
      "id": "2",
      "event": "Padel",
      "date": "7 jun",
      "created": "-",
      "duration": "60 min",
      "description": null,
      "location": "Göteborg",
      "time": "12.30",
      "attendees": "",
      "limit": 1,
      "hostId": null,
      "hostName": "Kalle",
      "longitude": 11.968996301293377,
      "latitude": 57.70653001068574
      },
      {
      "id": "3",
      "event": "Löpning",
      "date": "8 jun",
      "created": "-",
      "duration": "45 min",
      "description": null,
      "location": "Göteborg",
      "time": "18.00",
      "attendees": null,
      "limit": 5,
      "hostId": null,
      "hostName": "Pelle",
      "longitude": 11.988048367202282,
      "latitude": 57.703100532987094
      },
      {
      "id": "4",
      "event": "Promenad",
      "date": "10 jun",
      "created": "-",
      "duration": "60 min",
      "description": null,
      "location": "Stockholm",
      "time": "16.30",
      "attendees": null,
      "limit": 2,
      "hostId": null,
      "hostName": "Anna\t",
      "longitude": 11.965938583016394,
      "latitude": 57.69534400453568
      },
      {
      "id": "5",
      "event": "Klättring",
      "date": "11 jun",
      "created": "-",
      "duration": "120 min",
      "description": null,
      "location": "Malmö",
      "time": "09.45",
      "attendees": null,
      "limit": 1,
      "hostId": null,
      "hostName": "Klara",
      "longitude": 11.955756917595863,
      "latitude": 57.69825231506756
      },
      {
      "id": "6",
      "event": "Löpning",
      "date": "13 jun",
      "created": "-",
      "duration": "90 min",
      "description": null,
      "location": "Göteborg",
      "time": "19.00",
      "attendees": null,
      "limit": 2,
      "hostId": null,
      "hostName": "Johan",
      "longitude": 11.982437521219254,
      "latitude": 57.693817191384795
      },
      {
      "id": "7",
      "event": "Fotboll",
      "date": "16 jun",
      "created": "-",
      "duration": "90 min",
      "description": null,
      "location": "Malmö",
      "time": "20.00",
      "attendees": null,
      "limit": 6,
      "hostId": null,
      "hostName": "Nisse",
      "longitude": 11.962880529463291,
      "latitude": 57.71830455634495
      },
      {
      "id": "8",
      "event": "Badminton",
      "date": "20 jun",
      "created": "-",
      "duration": "60 min",
      "description": null,
      "location": "Stockholm",
      "time": "18.15",
      "attendees": null,
      "limit": 1,
      "hostId": null,
      "hostName": "Barbro",
      "longitude": 11.9832381606102,
      "latitude": 57.72938000381312
      },
      {
      "id": null,
      "event": "Hej",
      "date": "11 mar",
      "created": "",
      "duration": "12 min",
      "description": "",
      "location": "Malml",
      "time": "12.20",
      "attendees": "",
      "limit": 3,
      "hostId": "",
      "hostName": "Ken",
      "longitude": 11.958263777196406,
      "latitude": 57.674858457831206
      }
      ])
    // fetch(`http://192.168.0.12:3000/events`)
    // .then(response => response.json())
    // .then(result => {
    //   setEvents(result)  
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  }
  const months= ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
  const date = new Date()
  const today = `${date.getDate().toString()} ${months[date.getMonth()]}`
  useEffect(() => {
    console.log('ska hämta')
    getEvents()
  }, [])

  const refData = () => {
    

    console.log('listan uppdaterad')
  }
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(`http://192.168.0.12:3000/events`)
            .then(response => response.json())
            .then(result => {
              setEvents(result)  
            })
            .catch((error) => {
              console.log(error)
            })
    .then(() => setRefreshing(false))
      .then(() => refData())
  }, [refreshing]);

  return (


    <View style={styles.screen}>
      <Background />
      <View style={styles.header}>
        <Text style={styles.todaysDate}>{today}</Text>
        <Text style={styles.headerTxt}>Aktiviteter</Text>
        <View style={styles.headerMap}><FontAwesome name='map-o' size={24} color='#fff' /></View>
        <View style={styles.headerSlide}><FontAwesome name='sliders' size={24} color='#fff' /></View>
      </View>
      <FlatList
        data={events}
        renderItem={({ item }) =>
          <View style={styles.box}>
            <View style={styles.date}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.eventTime}>{item.time}</Text>
            <Text style={styles.eventText}>{item.event}, {item.duration}</Text>
            <Text style={styles.text}>{item.location}</Text>
            <Text style={styles.text}>Skapad av: {item.hostName}</Text>
            <Text style={styles.text}>Bokade platser: 0/{item.limit}</Text>
            <View style={styles.arrow}>
            <Ionicons name="ios-arrow-dropright" size={30} color="#68bed8" />
              </View>
            
          </View>}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        keyExtractor={item => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // marginTop: Constants.statusBarHeight
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#68bed8',
    width: Dimensions.get('window').width,
    borderBottomWidth: 0,
    marginBottom: 5
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
    right: 80
  },
  headerSlide: {
    color: '#fff',
    position: 'absolute',
    right: 20
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
    //borderWidth: 1,
    
    width: 50
  
  
  },
  arrow: {
    position: 'absolute',
    right: 20,
    top: 50,
  }
});
export default Home