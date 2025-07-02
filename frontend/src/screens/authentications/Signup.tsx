import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    ImageBackground, 
    TouchableOpacity, 
    StyleSheet,
    ActivityIndicator,
    Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

type RootStackParamList = {
    Started: undefined;
    Login: undefined;
    Signup: undefined;
    HomePage: undefined;
    Profile: undefined;
};

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface SignupProps {
    navigation: SignupScreenNavigationProp;
}

export default function Signup({ navigation }: SignupProps) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = {
            username: '',
            email: '',
            password: ''
        };

        if (!username) {
            newErrors.username = 'Username is required';
            isValid = false;
        }
        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const response = await fetch('http://192.168.254.4:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Registration failed. Please try again.');
            }
            // Save tokens
            await AsyncStorage.setItem('access', data.access);
            await AsyncStorage.setItem('refresh', data.refresh);
            await AsyncStorage.setItem('username', username);
            navigation.reset({ index: 0, routes: [{ name: 'HomePage' }] });
        } catch (error: any) {
            Alert.alert('Signup Failed', error.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground 
            source={require('../../../assets/fryrice.jpg')} 
            style={StyleSheet.absoluteFill} 
            resizeMode="cover"
        >
            <StatusBar style="light" translucent backgroundColor="transparent" />
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']} style={StyleSheet.absoluteFill} />
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join our community of food lovers!</Text>

                    <TextInput
                        style={[styles.input, errors.username ? styles.inputError : null]}
                        placeholder="Username"
                        placeholderTextColor="#999"
                        value={username}
                        onChangeText={(text) => { setUsername(text); setErrors(prev => ({ ...prev, username: '' })); }}
                        autoCapitalize="none"
                    />
                    {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

                    <TextInput
                        style={[styles.input, errors.email ? styles.inputError : null]}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={(text) => { setEmail(text); setErrors(prev => ({ ...prev, email: '' })); }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                    <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={(text) => { setPassword(text); setErrors(prev => ({ ...prev, password: '' })); }}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#999" />
                        </TouchableOpacity>
                    </View>
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleSignup}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>
                            Already have an account? <Text style={styles.loginLink}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { 
        flex: 1, 
        justifyContent: 'center' 
    },
    overlay: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0 
    },
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: 20 
    },
    card: { 
        width: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        padding: 20, 
        borderRadius: 12, 
        alignItems: 'center' 
    },
    title: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        color: '#FFF', 
        marginBottom: 10, 
        textAlign: 'center' 
    },
    subtitle: { 
        fontSize: 14, 
        color: '#CCC', 
        textAlign: 'center', 
        marginBottom: 20 
    },
    input: { 
        width: '100%', 
        height: 50, 
        backgroundColor: '#333', 
        borderRadius: 8, 
        padding: 12, 
        color: '#FFF', 
        marginBottom: 15 
    },
    passwordContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#333', 
        borderRadius: 8, 
        paddingHorizontal: 12, 
        height: 50, 
        width: '100%',
        marginBottom: 15
    },
    passwordInput: { 
        flex: 1, 
        color: '#FFF' 
    },
    button: { 
        backgroundColor: '#28A745', 
        paddingVertical: 12, 
        borderRadius: 8, 
        width: '100%', 
        alignItems: 'center', 
        marginTop: 10 
    },
    buttonDisabled: { 
        opacity: 0.7 
    },
    buttonText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    loginText: { 
        color: '#CCC', 
        fontSize: 14, 
        marginTop: 15 
    },
    loginLink: { 
        color: '#28A745', 
        fontWeight: 'bold' 
    },
    inputError: { 
        borderColor: '#FF6B6B', 
        borderWidth: 1 
    },
    errorText: { 
        color: '#FF6B6B', 
        fontSize: 12, 
        marginTop: -10, 
        marginBottom: 10, 
        alignSelf: 'flex-start' 
    }
});
