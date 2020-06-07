import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from './components/BottomNav'
import { useObserver } from 'mobx-react-lite'
import Context from './Context/Context'
import store from './store/store'

export default function App() {
  
  return useObserver(() => (

    <Context.Provider value={store}>
      <StatusBar hidden={true} backgroundColor='#fff' barStyle='dark-content' />

      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </Context.Provider>
  ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
