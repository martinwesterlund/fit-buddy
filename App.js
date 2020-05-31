import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from './components/BottomNav'

import Context from './Context/Context'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)


  const [user, setUser] = useState(
    {
      name: "Kennet",
      age: 30,
      sex: 'Man',
      email: 'kennet@gmail.com',
      phone: '0701234567'
    }
  )

  const [events, setEvents] = useState(null)

  

  return (

    <Context.Provider value={{ loggedIn, setLoggedIn, user, setUser, events, setEvents }}>
      <StatusBar hidden={true} backgroundColor='#fff' barStyle='dark-content' />

      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </Context.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
