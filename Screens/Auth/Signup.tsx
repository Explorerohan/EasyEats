import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Signup({ navigation }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleLogin = () => {
        navigation.navigate('login');
    };

    return (
        <ImageBackground
            source={require('../../assets/fryrice.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)']}
                style={styles.overlay}
            />

            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Join Us and Discover New Recipes</Text>
                    <Text style={styles.subtitle}>
                        Create an account to unlock amazing recipes and more!
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        {password.length > 0 && (
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Ionicons
                                    name={passwordVisible ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#999"
                                    style={styles.eyeIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm Password"
                            placeholderTextColor="#999"
                            secureTextEntry={!confirmPasswordVisible}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        {confirmPassword.length > 0 && (
                            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                <Ionicons
                                    name={confirmPasswordVisible ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#999"
                                    style={styles.eyeIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => alert('Signed up!')}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.registerText}>
                            Already have an account? <Text style={styles.registerLink}>Login</Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Social Media Icons */}
                    <View style={styles.socialIconsContainer}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="logo-google" size={24} color="#DB4437" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="logo-facebook" size={24} color="#3b5998" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 12,
        color: '#FFFFFF',
        marginBottom: 15,
    },
    passwordContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        color: '#FFFFFF',
        height: '100%', 
    },
    eyeIcon: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#007A4D',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerText: {
        color: '#CCCCCC',
        fontSize: 14,
        textAlign: 'center',
    },
    registerLink: {
        color: '#FFAA00',
        fontWeight: 'bold',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    iconButton: {
        marginHorizontal: 10,
    },
});