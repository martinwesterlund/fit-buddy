import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import Background from '../components/Background'
import Context from '../Context/Context'

function Login() {

  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)

  const login = () => {
    setLoggedIn(true)
  }

  const logout = () => {
    setLoggedIn(false)
  }

  return (
    <View style={styles.container}>
      <Background />
      <Image source={require('./fitbuddy.png')} style={styles.img} />
      {!loggedIn && (<View>
        <Text style={styles.text}>Username</Text>
        <TextInput placeholder='example@example.com' style={styles.input}></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput placeholder='password' secureTextEntry={true} style={styles.input}></TextInput>
        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>
      </View>)}
      {loggedIn && (<View>
        <TouchableOpacity style={styles.btn} onPress={logout}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View>)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    paddingLeft: 15,
    width: 250,
    borderRadius: 5
  },
  img: {
    width: 150,
    height: 100,
    marginBottom: 50
  },
  btn: {
    backgroundColor: 'lightblue',
    width: 250,
    height: 50,
    marginTop: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});

export default Login