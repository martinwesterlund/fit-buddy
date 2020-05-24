import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import Context from '../Context/Context'
import Background from '../components/Background'
import Constants from 'expo-constants';

function Home() {

  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)



  return (


    <View style={styles.screen}>
      <Background />
      <View style={styles.header}><Text style={styles.headerTxt}>Events</Text></View>
      <FlatList
          data={events}
          renderItem={({ item }) => <View style={styles.box}><View style={styles.date}><Text>{item.date}</Text></View><Text style={styles.text}>{item.event} - {item.created}</Text></View>}
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    borderBottomWidth: 1,
    marginBottom: 5
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 20
  },
  box: {
    width: Dimensions.get('window').width -10,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cbffe6',
    margin: 5,
    padding: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#000',
    borderWidth: 1
  },
  date: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 18,
  },
});
export default Home