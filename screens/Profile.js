import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import Context from '../Context/Context'
import Background from '../components/Background'

function Profile() {
  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)


  return (
    <View style={styles.container}>
      <Background />
      <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.img} />
      <Text>{user.name}</Text>
      <Text>{user.age}</Text>
      <Text>{user.sex}</Text>
      <Text>{user.email}</Text>
      <Text>{user.phone}</Text>
      <Button
        onPress={() => {
          setUser({
            name: "Börje",
            age: 12,
            sex: 'female',
            email: 'borje@gmail.com',
            phone: '0734554332'
          })
        }}
        title='Byt namn till Börje'
      />
      <Text>{events[0].event}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 65
  }
});

export default Profile