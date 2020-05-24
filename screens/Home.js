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
          renderItem={({ item }) => <View style={styles.box}><Text style={styles.text}>{item.event} - {item.created}</Text></View>}
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
    width: Dimensions.get('window').width -50,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 5,
    padding: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#000',
    borderWidth: 1
  },
  text: {
    fontSize: 18,
  },
});
export default Home