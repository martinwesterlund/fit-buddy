import React, { useState, useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Context from '../Context/Context'
import Home from '../screens/Home'
import Post from '../screens/Post'
import Profile from '../screens/Profile'
import Login from '../screens/Login'

import Ionicons from '@expo/vector-icons/Ionicons'



function BottomNav() {
  const Tab = createBottomTabNavigator();
  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)
  const [loginLogout, setLoginLogout] = useState('Login')

  useEffect(() => {
    if (loggedIn) {
      setLoginLogout('Logout')
    } else {
      setLoginLogout('Login')
    }
  }, [loggedIn])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Login':
              iconName = 'ios-key'
              break
            case 'Logout':
              iconName = 'ios-key'
              break
            case 'Events':
              iconName = 'md-calendar'
              break
            case 'Post':
              iconName = 'ios-add-circle'
              break
            case 'Profile':
              iconName = 'ios-contact'
              break
          }
          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      
      tabBarOptions={{
        activeTintColor: '#010dff',
        inactiveTintColor: '#bebebe',
        showLabel: false,
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        },
        style: {
          backgroundColor: '#fff',
          //borderTopColor: '#010dff',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10
        }
      }
      
      }
    >
      <Tab.Screen name={loginLogout} component={Login} />
      <Tab.Screen name="Events" component={Home} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>
  );
}

export default BottomNav