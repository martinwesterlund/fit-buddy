import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, Dimensions } from 'react-native';
import Context from '../Context/Context'
import Background from '../components/Background'
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialIcons } from '@expo/vector-icons';
import { useObserver } from 'mobx-react-lite'

function Profile() {
  // const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)
  const store = useContext(Context)

  return useObserver(() => (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Din profil</Text>
        <View style={styles.headerEdit}>
        <MaterialIcons name="edit" size={30} color="#fff" />
      </View>
      </View>
      
      {store.loggedIn ? 
      <View style={styles.profileBox}>
        <Image source={{ uri: `https://randomuser.me/api/portraits/men/1.jpg` }} style={styles.img} />
        <Text style={styles.nameText}>{store.user.firstname}, {new Date().getFullYear() - store.user.birthyear}</Text>

        <Text style={styles.text}>{store.user.gender}</Text>
        <Text style={styles.text}>{store.user.city}</Text>
        <View style={styles.infoBox}>
          <Ionicons name='ios-mail' size={30} />
          <Text style={styles.text}>{store.user.email}</Text>
        </View>
        <View style={styles.infoBox}>
          <Ionicons name='ios-phone-portrait' size={30} />
          <Text style={styles.text}>{store.user.phone}</Text>
        </View>
      </View>
      : <Text>Inte inloggad</Text>}


      {/* <Button
        onPress={() => {
          setUser({
            name: "Börje",
            age: 12,
            sex: 'female',
            email: 'borje@gmail.com',
            phone: '0734554332'
          })
        }}
        title='Byt namn till Börje'
      />
      <Text>{events[0].event}</Text> */}

    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#68bed8',
    width: Dimensions.get('window').width,
    borderBottomWidth: 0,
    marginBottom: 5
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff'
  },
  headerEdit: {
    color: '#fff',
    position: 'absolute',
    right: 20
  },
  
  profileBox: {
    marginTop: 100,
    paddingTop: 80,
    alignItems: 'center',
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 15
  },
  img: {
    position: 'absolute',
    top: -65,
    width: 130,
    height: 130,
    borderRadius: 65,
    borderColor: '#000',
    borderWidth: 0
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10
  },

});

export default Profile