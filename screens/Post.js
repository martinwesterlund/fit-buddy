import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import Context from '../Context/Context'
import Background from '../components/Background'
import { v4 as uuidv4 } from 'uuid';
import RNPickerSelect from 'react-native-picker-select'
import { FontAwesome } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'

function Post() {
  const { loggedIn, setLoggedIn, user, setUser, events, setEvents } = useContext(Context)

  const [newEvent, setNewEvent] = useState()

  useEffect(() => {
    console.log('Eventlistan uppdaterad')

  }, [events])

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <Background />
          <View style={styles.header}>
            <Text style={styles.headerTxt}>Skapa ett nytt event</Text>
          </View>
          <View style={styles.postForm}>

            <View style={styles.dateTime}>
              <View style={styles.calendarContainer}>
                <FontAwesome name='calendar' size={30} color='#000' onPress={() => {
                  console.log('datum')
                }} />
              </View>
              <View style={styles.calendarContainer}>
                <Ionicons name="md-time" size={30} color="#000" />
              </View>
              </View>
              <View style={styles.dateTime}>
                <View style={styles.timeDisplay}><Text>ÅÅÅÅ-MM-DD</Text></View>
                <View style={styles.timeDisplay}><Text>18.00</Text></View>
              </View>
            
            <Text style={styles.text}>Aktivitet</Text>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  backgroundColor: 'white',
                  color: 'black',
                  borderWidth: 0,
                  borderColor: 'black',
                  padding: 5,
                  paddingLeft: 15,
                  borderRadius: 5
                }
              }}
              placeholder={{ label: 'Välj aktivitet' }}
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'Löpning', value: 'running' },
                { label: 'Promenad', value: 'walking' },
                { label: 'Padel', value: 'padel' },
                { label: 'Fotboll', value: 'football' },
                { label: 'Simning', value: 'swimming' },
                { label: 'Frisbeegolf', value: 'discgolf' },
                { label: 'Övrigt', value: 'other' }
              ]}
            />
            <Text style={styles.text}>Beskrivning</Text>
            <TextInput
              multiline={true}
              style={styles.inputMultiline}
            />



            <Text style={styles.text}>Plats</Text>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  backgroundColor: 'white',
                  color: 'black',
                  borderWidth: 0,
                  borderColor: 'black',
                  padding: 5,
                  paddingLeft: 15,
                  borderRadius: 5
                }
              }}
              placeholder={{ label: 'Välj stad' }}
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'Göteborg', value: 'goteborg' },
                { label: 'Stockholm', value: 'stockholm' },
                { label: 'Malmö', value: 'malmo' }
              ]}
            />
            <Text style={styles.text}>Längd</Text>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  backgroundColor: 'white',
                  color: 'black',
                  borderWidth: 0,
                  borderColor: 'black',
                  padding: 5,
                  paddingLeft: 15,
                  borderRadius: 5
                }
              }}
              placeholder={{ label: 'Välj längd på eventet' }}
              onValueChange={(value) => console.log(value)}
              items={[
                { label: '30 min', value: '30' },
                { label: '45 min', value: '45' },
                { label: '60 min', value: '60' },
                { label: '75 min', value: '75' },
                { label: '90 min', value: '90' },
                { label: '120 min', value: '120' },
                { label: '180 min', value: '180' }
              ]}
            />
            <Text style={styles.text}>Max antal deltagare</Text>
            <TextInput
              numeric
              keyboardType={"number-pad"}
              style={styles.input}
            />

          </View>
          <TouchableOpacity style={styles.btn} onPress={() => {
            setEvents([{
              id: uuidv4(),
              event: "Gym",
              date: '13 jun',
              created: '-'
            }, ...events])
          }}>
            <Text style={styles.registerText}>Skapa event</Text>
          </TouchableOpacity>

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
  header: {
    position: 'absolute',
    top: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#68bed8',
    width: Dimensions.get('window').width,
    borderBottomWidth: 0,
    marginBottom: 5,
    zIndex: 1
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff'
  },
  postForm: {
    marginTop: 50
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center'
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 20
  },

  text: {
    fontSize: 16,
    paddingTop: 5
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
  inputMultiline: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 0,
    paddingLeft: 15,
    width: 250,
    borderRadius: 5,
    height: 75,
    textAlignVertical: 'top',
    padding: 10,
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // margin: 15,
  },
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
    borderRadius: 25
  },
  timeDisplay: {
    width: 100,
    alignItems: 'center',
    margin: 0
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
    borderWidth: 1,
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
  }
});

export default Post

