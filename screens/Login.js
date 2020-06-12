import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, Modal, TouchableHighlight, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Background from '../components/Background'
import Localhost from '../components/Localhost'
import Context from '../Context/Context'
import { useObserver } from 'mobx-react-lite'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FontAwesome } from '@expo/vector-icons'


function Login() {
  const store = useContext(Context)
  const [modalVisible, setModalVisible] = useState(false);

  //New user data
  const [newUsername, setNewUsername] = useState()
  const [newPassword, setNewPassword] = useState()
  const [newFirstName, setNewFirstName] = useState()
  const [newLastName, setNewLastName] = useState()
  const [newBirthyear, setNewBirthyear] = useState()
  const [newPhone, setNewPhone] = useState()
  const [newEmail, setNewEmail] = useState()

  const [loginError, setLoginError] = useState(false)
  const [error, setError] = useState(false)

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
    })
      .then(response => response.json())
      .then(data => {
        store.setUserData(data[0])
        store.setAsLoggedIn()
      })
      .catch((error) => {
        setLoginError(true)
      });

  }



  const addNewUser = () => {
    setError(false)

    fetch(`${Localhost}:3000/users`, {
      method: "post",
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
        gender: 'Man',
        city: 'Göteborg'

      })
    })
      .then(result => {
        if (result.status === 201) {
          setModalVisible(false)
        }
        else {
          setError(true)

        }
      })
  }

  const logout = () => {
    store.setAsLoggedOut()
    store.setInloggedUser(null)
    store.setInloggedUserPW(null)
    store.setUserData(null)
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
                }}><FontAwesome name='close' size={24} color='#fff' /></TouchableOpacity>

                <View>
                  <Text style={styles.headerText}>Registrera nytt konto</Text>
                  <Text style={styles.text}>Användarnamn</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={value => setNewUsername(value)}
                  />
                  {error && <Text style={styles.error}>Användarnamnet är upptaget!</Text>}
                  <Text style={styles.text}>Lösenord</Text>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={value => setNewPassword(value)}
                  />
                  <Text style={styles.text}>Förnamn</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={value => setNewFirstName(value)}
                  />
                  <Text style={styles.text}>Efternamn</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={value => setNewLastName(value)}
                  />
                  <Text style={styles.text}>Födelseår</Text>
                  <TextInput
                    keyboardType={"number-pad"}
                    style={styles.input}
                    onChangeText={value => setNewBirthyear(value)}
                  />
                  <Text style={styles.text}>Telefon</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={value => setNewPhone(value)}
                  />
                  <Text style={styles.text}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={value => setNewEmail(value)}
                  />
                  <TouchableOpacity
                    style={styles.regBtn}
                    onPress={() => addNewUser()}>
                    <Text style={styles.btnText}>Registrera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Image source={require('./fitbuddy.png')} style={styles.img} />
          {!store.loggedIn ? <View style={styles.form}>
            <Text style={styles.text}>Användarnamn</Text>
            <TextInput onChangeText={value => store.setInloggedUser(value)} value={store.inloggedUser.name} placeholder='exampel@exempel.com' style={styles.input}></TextInput>
            <Text style={styles.text}>Lösenord</Text>
            <TextInput onChangeText={value => store.setInloggedUserPW(value)} value={store.inloggedUser.password} placeholder='lösenord' secureTextEntry={true} style={styles.input}></TextInput>
            <TouchableOpacity style={styles.btn} onPress={login}>
              <Text style={styles.btnText}>Logga in</Text>
            </TouchableOpacity>
            {loginError && <Text style={styles.error}>Felaktigt användarnamn eller lösenord</Text>}
            <TouchableOpacity style={styles.register}>
              <Text style={styles.registerText} onPress={() => {
                setModalVisible(true);
              }}>Ny användare? Registrera konto här!</Text>
            </TouchableOpacity>
          </View>
            : <View style={styles.form}>
              <Text style={styles.textCenter}>Inloggad som {store.user.username}</Text>
              <TouchableOpacity style={styles.btn} onPress={logout}>
                <Text style={styles.text}>Logga ut</Text>
              </TouchableOpacity>
            </View>}

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
    right: 0,
    top: 0,
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
    backgroundColor: '#abd9e7',
    // marginBottom: 30,
    borderRadius: 15
  },
  error: {
    color: 'red'
  }
});

export default Login