import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, Modal, TouchableHighlight, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Background from '../components/Background'
import Localhost from '../components/Localhost'
import Context from '../Context/Context'
import { useObserver } from 'mobx-react-lite'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FontAwesome } from '@expo/vector-icons'


function NewUser() {
    const store = useContext(Context)
    const [userName, setUserName] = useState()

    return useObserver(() => (
        <Modal
            animationType="fade"
            transparent={true}
            
            onRequestClose={() => {
                console.log('Modal closing');
            }}>

            <View style={styles.modalContainer}>

                <View style={styles.modal}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => {
                        setModalVisible(!modalVisible);
                    }}><FontAwesome name='close' size={24} color='#fff' /></TouchableOpacity>

                    <View>
                        <Text style={styles.headerText}>Registrera nytt konto</Text>
                        <Text style={styles.text}>Användarnamn</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={value => setUserName(value)}
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
                        <TouchableOpacity
                            style={styles.regBtn}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.btnText}>Registrera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

    ));
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
        right: 0,
        top: 0,
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
    btnText: {
        fontSize: 16,
        color: '#fff'
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
        backgroundColor: '#68bed8',
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
        backgroundColor: '#68bed8',
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
        backgroundColor: '#00000095'

    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height - 50,
        width: Dimensions.get('window').width - 50,
        backgroundColor: '#abd9e7',
        // marginBottom: 30,
        borderRadius: 15
    }
});

export default NewUser