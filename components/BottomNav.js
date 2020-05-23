import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home'
import Post from '../screens/Post'
import Profile from '../screens/Profile'
import Login from '../screens/Login'

import Ionicons from '@expo/vector-icons/Ionicons'

function BottomNav() {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            switch (route.name) {
              case 'Login':
                iconName = 'ios-key'
                break
              case 'Home':
                iconName = 'ios-home'
                break
              case 'Post':
                iconName = 'ios-add-circle'
                break
              case 'Profile':
                iconName = 'ios-contact'
                break
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#010dff',
          inactiveTintColor: '#bebebe',
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
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Post" component={Post} />
        <Tab.Screen name="Profile" component={Profile} />
  
      </Tab.Navigator>
    );
  }

  export default BottomNav