import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('Login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REGISTRO</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Ingresa tu correo electrónico'
                    onChangeText={(texto) => setCorreo(texto)}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Ingresa contraseña'
                    onChangeText={(texto) => setContrasenia(texto)}
                    secureTextEntry={true}
                />

                <Button title='Registrar' onPress={registro} color='#841584' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        width: '100%',
        maxWidth: 400, // Limita el ancho del formulario para dispositivos más grandes
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
});
