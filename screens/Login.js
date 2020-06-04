import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, Modal, TouchableHighlight, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Background from '../components/Background'
import Context from '../Context/Context'
import Ionicons from '@expo/vector-icons/Ionicons'

function Login() {

  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)
  const [modalVisible, setModalVisible] = useState(false);
  const [newUser, setNewUser] = useState()
  const login = () => {
    setLoggedIn(true)
  }

  const logout = () => {
    setLoggedIn(false)
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.screen}>
      <Background />
      <Modal
        animationType="slide"
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
              <TouchableHighlight
                style={styles.regBtn}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.text}>Registrera</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <Image source={require('./fitbuddy.png')} style={styles.img} />
      {!loggedIn && (<View style={styles.form}>
        <Text style={styles.text}>Användarnamn</Text>
        <TextInput placeholder='exampel@exempel.com' style={styles.input}></TextInput>
        <Text style={styles.text}>Lösenord</Text>
        <TextInput placeholder='lösenord' secureTextEntry={true} style={styles.input}></TextInput>
        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.text}>Logga in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.register}>
          <Text style={styles.registerText} onPress={() => {
            setModalVisible(true);
          }}>Ny användare? Registrera konto här!</Text>
        </TouchableOpacity>
      </View>)}
      {loggedIn && (<View style={styles.form}>
        <Text style={styles.textCenter}>Inloggad som USER</Text>
        <TouchableOpacity style={styles.btn} onPress={logout}>
          <Text style={styles.text}>Logga ut</Text>
        </TouchableOpacity>
      </View>)}

    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
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
    backgroundColor: 'lightblue',
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
    backgroundColor: 'lightblue',
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

  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 50,
    width: Dimensions.get('window').width - 50,
    borderWidth: 0,
    backgroundColor: '#68bed8',
    marginBottom: 30,
    borderRadius: 15
  }
});

export default Login