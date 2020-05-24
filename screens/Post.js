import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Context from '../Context/Context'
import Background from '../components/Background'
import uuid from 'react-native-uuid';

function Post() {
  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)

  useEffect(() => {
    console.log('Eventlistan uppdaterad')

  }, [events])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Background />
      <Text>Post page</Text>
      <Button
        onPress={() => {
          setEvents([{
            id: uuid.v4(),
            event: 'BungeeJump',
            created: new Date().toString()
          }, ...events])
        }}
        title='Lägg till event'
      />
    </View>
  );
}

export default Post
