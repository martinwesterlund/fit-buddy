import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from './components/BottomNav'

import Context from './Context/Context'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const [user, setUser] = useState(
    {
      name: "Martin",
      age: 34,
      sex: 'male',
      email: 'martin@gmail.com',
      phone: '0701750412'
    }
  )

  const [events, setEvents] = useState([
    {
      id: '1',
      event: "Football",
      date: 14,
      created: '-' 
    },
    {
      id: '2',
      event: "Padel",
      date: 14,
      created: '-' 
    },
    {
      id: '3',
      event: "Jogging",
      date: 14,
      created: '-' 
    },
    {
      id: '4',
      event: "Walking",
      date: 14,
      created: '-' 
    },
    {
      id: '5',
      event: "Walking",
      date: 14,
      created: '-' 
    },
    {
      id: '6',
      event: "Walking",
      date: 14,
      created: '-' 
    },
    {
      id: '7',
      event: "Walking",
      date: 14,
      created: '-' 
    },
    {
      id: '8',
      event: "Walking",
      date: 14,
      created: '-' 
    },
    {
      id: '9',
      event: "Walking",
      date: 14,
      created: '-' 
    },
    {
      id: '10',
      event: "Walking",
      date: 14,
      created: '-' 
    },

  ])

  console.log()

  return (
    
    <Context.Provider value={{ loggedIn, setLoggedIn, user, setUser, events, setEvents }}>
    <StatusBar backgroundColor='#fff' barStyle='dark-content'/>
    
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
