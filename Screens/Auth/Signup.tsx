import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            // Firebase code would be here
            Alert.alert('Success', 'Account created successfully');
            navigation.navigate('login');
        } catch (error) {
            Alert.alert('Signup Error', error.message);
        }
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
                    <Text style={styles.subtitle}>Create an account to unlock amazing recipes and more!</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
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
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#999" style={styles.eyeIcon} />
                        </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            <Ionicons name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#999" style={styles.eyeIcon} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center' },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
    card: { width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20, borderRadius: 12, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 14, color: '#CCCCCC', textAlign: 'center', marginBottom: 20 },
    input: { width: '100%', height: 50, backgroundColor: '#2A2A2A', borderRadius: 8, padding: 12, color: '#FFFFFF', marginBottom: 15 },
    passwordContainer: { width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A2A2A', borderRadius: 8, paddingHorizontal: 12, marginBottom: 15 },
    passwordInput: { flex: 1, color: '#FFFFFF', height: '100%' },
    eyeIcon: { marginLeft: 10 },
    button: { backgroundColor: '#007A4D', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});
