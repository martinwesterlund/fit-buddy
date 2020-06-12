import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, FlatList, Button, Dimensions, Modal, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Context from '../Context/Context'
import Localhost from '../components/Localhost'
import Background from '../components/Background'
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialIcons } from '@expo/vector-icons';
import { useObserver } from 'mobx-react-lite'
import { FontAwesome } from '@expo/vector-icons'

function Profile() {

  const store = useContext(Context)

  const [modalVisible, setModalVisible] = useState(false)

  // Update user data
  const [newUsername, setNewUsername] = useState()
  const [newPassword, setNewPassword] = useState()
  const [newFirstName, setNewFirstName] = useState()
  const [newLastName, setNewLastName] = useState()
  const [newBirthyear, setNewBirthyear] = useState()
  const [newPhone, setNewPhone] = useState()
  const [newEmail, setNewEmail] = useState()
  const [newGender, setNewGender] = useState()
  const [newCity, setNewCity] = useState()

  const [error, setError] = useState(false)

  useEffect(() => {
    if (store.user) {
      setNewUsername(store.user.username)
      setNewPassword(store.user.password)
      setNewFirstName(store.user.firstname)
      setNewLastName(store.user.lastname)
      setNewEmail(store.user.email)
      setNewPhone(store.user.phone)
      setNewBirthyear(store.user.birthyear)
      setNewGender(store.user.gender)
      setNewCity(store.user.city)
      
      console.log(store.user.birthyear)

    }
  }, [store.loggedIn])

  const updateProfile = () => {
    setError(false)
    fetch(`${Localhost}:3000/users`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        phone: newPhone,
        birthyear: newBirthyear,
        gender: newGender,
        city: newCity,
        oldusername: store.user.username
      })
    })
    .then(result => {
      if (result.status === 200) {
        setModalVisible(false)
        
        store.setUserData({
          username: newUsername,
          password: newPassword,
          firstname: newFirstName,
          lastname: newLastName,
          email: newEmail,
          phone: newPhone,
          birthyear: newBirthyear,
          gender: newGender,
          city: newCity
        })
      }
      else {
        setError(true)

      }
    })
    // .then(response => response.json())
    // .then(data => {
    //   store.setUserData(data[0])
    //   store.setAsLoggedIn()
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  }

  return useObserver(() => (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Din profil</Text>
        <View style={styles.headerEdit}>
          <MaterialIcons name="edit" size={30} color="#fff" onPress={() => setModalVisible(!modalVisible)} />
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

      {store.loggedIn && <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal closing');
        }}>

        <View style={styles.modalContainer}>

          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => { setModalVisible(!modalVisible) }}>
              <FontAwesome name='close' size={24} color='#fff' />
            </TouchableOpacity>
            <Text style={styles.headerText}>Uppdatera din profil</Text>
            <SafeAreaView style={styles.contentContainer}>
              <ScrollView style={styles.scrollView}>

                <Text style={styles.text}>Användarnamn</Text>
                <TextInput
                  style={styles.input}
                  value={newUsername}
                  onChangeText={value => setNewUsername(value)}
                />
                {error && <Text style={styles.error}>Användarnamnet är upptaget!</Text>}
                <Text style={styles.text}>Lösenord</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  value={newPassword}
                  onChangeText={value => setNewPassword(value)}
                />
                <Text style={styles.text}>Förnamn</Text>
                <TextInput
                  style={styles.input}
                  value={newFirstName}
                  onChangeText={value => setNewFirstName(value)}
                />
                <Text style={styles.text}>Efternamn</Text>
                <TextInput
                  style={styles.input}
                  value={newLastName}
                  onChangeText={value => setNewLastName(value)}
                />
                <Text style={styles.text}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={newEmail}
                  onChangeText={value => setNewEmail(value)}
                />
                <Text style={styles.text}>Mobilnummer</Text>
                <TextInput
                keyboardType={"number-pad"}
                  style={styles.input}
                  value={newPhone}
                  onChangeText={value => setNewPhone(value)}
                />
                <Text style={styles.text}>Födelseår</Text>
                <TextInput
                keyboardType={"number-pad"}
                  style={styles.input}
                  onChangeText={value => setNewBirthyear(value)}
                />
                <Text style={styles.text}>Kön</Text>
                <TextInput
                  style={styles.input}
                  value={newGender}
                  onChangeText={value => setNewGender(value)}
                />
                <Text style={styles.text}>Stad</Text>
                <TextInput
                  style={styles.input}
                  value={newCity}
                  onChangeText={value => setNewCity(value)}
                />



              </ScrollView>
            </SafeAreaView>
            <TouchableOpacity
              style={styles.regBtn}
              onPress={() => updateProfile()}>
              <Text style={styles.btnText}>Uppdatera din profil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>}


    </View>
  ));
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 30,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
  },
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
    // marginBottom: 30,
    borderRadius: 15
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 25
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 0,
    marginTop: 25,
    color: '#fff'
  },
  text: {
    fontSize: 16,
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
  error: {
    color: 'red'
  }

});

export default Profile