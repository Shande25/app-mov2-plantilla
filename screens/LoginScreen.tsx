import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('Drawer');
                Alert.alert("Acceso exitoso");
                // Resetear los campos después de iniciar sesión exitosamente
                setCorreo('');
                setContrasenia('');
            })
            .catch((error) => {
                let titulo = "";
                let mensaje = "";
                if (error.code === "auth/wrong-password") {
                    titulo = 'Error de contraseña';
                    mensaje = 'Contraseña incorrecta, revisa tus credenciales.';
                } else if (error.code === "auth/user-not-found") {
                    titulo = "Error de usuario";
                    mensaje = "Usuario no encontrado, revisa tu correo electrónico.";
                } else {
                    titulo = "Error de acceso";
                    mensaje = "Revisa tus credenciales de correo y contraseña.";
                }
                Alert.alert(titulo, mensaje);
                // Resetear los campos después de mostrar el mensaje de error
                setCorreo('');
                setContrasenia('');
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Correo electrónico'
                    onChangeText={(texto) => setCorreo(texto)}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={correo}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'
                    onChangeText={(texto) => setContrasenia(texto)}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={contrasenia}
                />

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={login}
                >
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.register}>¿No tienes cuenta? Regístrate aquí.</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7', // Fondo claro
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
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
    loginButton: {
        width: '100%',
        backgroundColor: '#841584', // Color morado
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    register: {
        marginTop: 15,
        color: '#007bff', // Color azul
        fontSize: 16,
    },
});
