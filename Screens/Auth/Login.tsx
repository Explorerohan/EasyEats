import React, { useState } from 'react';
import { 
    View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, 
    Alert, ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Login Failed', error.message);
        }
        setLoading(false);
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
                    <Text style={styles.title}>Just a Step Away from Your Recipe</Text>
                    <Text style={styles.subtitle}>Discover amazing recipes with ease. Log in or sign up to get started!</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
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
                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={styles.registerText}>New to get recipes? <Text style={styles.registerLink}>Register Now</Text></Text>
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
    card: { width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 14, color: '#CCCCCC', textAlign: 'center', marginBottom: 20 },
    input: { width: '100%', height: 50, backgroundColor: '#2A2A2A', borderRadius: 8, padding: 12, color: '#FFFFFF', marginBottom: 15 },
    passwordContainer: { width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A2A2A', borderRadius: 8, paddingHorizontal: 12, marginBottom: 15 },
    passwordInput: { flex: 1, color: '#FFFFFF' },
    eyeIcon: { marginLeft: 10 },
    button: { backgroundColor: '#007A4D', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    registerText: { color: '#CCCCCC', fontSize: 14, textAlign: 'center' },
    registerLink: { color: '#FFAA00', fontWeight: 'bold' },
});