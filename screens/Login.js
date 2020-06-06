import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, Modal, TouchableHighlight, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Background from '../components/Background'
import Localhost from '../components/Localhost'
import Context from '../Context/Context'
import { useObserver } from 'mobx-react-lite'
import Ionicons from '@expo/vector-icons/Ionicons'


function Login() {
  const store = useContext(Context)
  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)
  const [modalVisible, setModalVisible] = useState(false);
  const [newUser, setNewUser] = useState()


  const login = () => {
    fetch(`${Localhost}:3000/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: store.inloggedUser.name,
        password: store.inloggedUser.password
      })
    }).then(result => {
      if (result.status === 200) {
        console.log('Inloggning lyckades')
        getUserData()

      }
      else if (result.status === 401) {
        console.log('Felaktigt användarnamn och lösenord')
      }
      else {
        console.log('Något gick fel')
      }
    })
  }

  const getUserData = () => {
    fetch(`${Localhost}:3000/users/${store.inloggedUser.name}`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        store.setUserData(result[0])
        store.setAsLoggedIn()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logout = () => {
    setLoggedIn(false)
  }

  return useObserver(() => (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <Background />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              console.log('Modal closing');
            }}>

            <View style={styles.modalContainer}>

              <View style={styles.modal}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => {
                  setModalVisible(!modalVisible);
                }}><Ionicons name="md-close" size={24} color="black" /></TouchableOpacity>

                <View>
                  <Text style={styles.headerText}>Registrera nytt konto</Text>
                  <Text style={styles.text}>Användarnamn</Text>
                  <TextInput
                    style={styles.input}

                  />
                  <Text style={styles.text}>Lösenord</Text>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                  />
                  <Text style={styles.text}>Förnamn</Text>
                  <TextInput
                    style={styles.input}
                  />
                  <Text style={styles.text}>Efternamn</Text>
                  <TextInput
                    style={styles.input}
                  />
                  <Text style={styles.text}>Födelseår</Text>
                  <TextInput
                    keyboardType={'number-pad'}
                    style={styles.input}
                  />
                  <Text style={styles.text}>Telefon</Text>
                  <TextInput
                    style={styles.input}
                  />
                  <Text style={styles.text}>Email</Text>
                  <TextInput
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={styles.regBtn}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.btnText}>Registrera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Image source={require('./fitbuddy.png')} style={styles.img} />
          {!loggedIn && (<View style={styles.form}>
            <Text style={styles.text}>Användarnamn</Text>
            <TextInput onChangeText={value => store.setInloggedUser(value)} value={store.inloggedUser.name} placeholder='exampel@exempel.com' style={styles.input}></TextInput>
            <Text style={styles.text}>Lösenord</Text>
            <TextInput onChangeText={value => store.setInloggedUserPW(value)} value={store.inloggedUser.password} placeholder='lösenord' secureTextEntry={true} style={styles.input}></TextInput>
            <TouchableOpacity style={styles.btn} onPress={login}>
              <Text style={styles.btnText}>Logga in</Text>
            </TouchableOpacity>
            <Text>Namn: {store.inloggedUser.name}</Text>
            <Text>PW: {store.inloggedUser.password}</Text>
            <TouchableOpacity style={styles.register}>
              <Text style={styles.registerText} onPress={() => {
                setModalVisible(true);
              }}>Ny användare? Registrera konto här!</Text>
            </TouchableOpacity>
          </View>)}
          {store.loggedIn && (<View style={styles.form}>
            <Text style={styles.textCenter}>Inloggad som {store.inloggedUser.name}</Text>
            <TouchableOpacity style={styles.btn} onPress={logout}>
              <Text style={styles.text}>Logga ut</Text>
            </TouchableOpacity>
          </View>)}

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // marginTop: Constants.statusBarHeight
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 25
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
  textCenter: {
    fontSize: 16,
    textAlign: 'center'
  },
  registerText: {
    fontSize: 16,
    textAlign: 'center'
  },
  form: {
    marginTop: 200
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
  img: {
    position: 'absolute',
    top: 100,

    width: 150,
    height: 100,
    marginBottom: 50
  },
  regBtn: {
    backgroundColor: '#68bed8',
    width: 250,
    height: 50,
    marginTop: 30,
    padding: 20,
    borderWidth: 0,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btn: {
    backgroundColor: '#68bed8',
    width: 250,
    height: 50,
    marginTop: 12,
    padding: 20,
    borderWidth: 0,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  register: {
    width: 250,
    height: 50,
    marginTop: 100,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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
    height: Dimensions.get('window').height - 50,
    width: Dimensions.get('window').width - 50,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#abd9e7',
    marginBottom: 30,
    borderRadius: 15
  }
});

export default Login