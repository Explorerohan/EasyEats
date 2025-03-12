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

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Signup: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
    navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        // Email validation
        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        // Password validation
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

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            // TODO: Implement your login logic here
            // For now, we'll simulate a login delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Navigate to Home on successful login
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert(
                'Login Failed',
                'Please check your credentials and try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
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
                    <Text style={styles.title}>Just a Step Away from Your Recipe</Text>
                    <Text style={styles.subtitle}>Discover amazing recipes with ease. Log in or sign up to get started!</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, errors.email ? styles.inputError : null]}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Password"
                                placeholderTextColor="#999"
                                secureTextEntry={!passwordVisible}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrors(prev => ({ ...prev, password: '' }));
                                }}
                            />
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Ionicons 
                                    name={passwordVisible ? 'eye-off' : 'eye'} 
                                    size={24} 
                                    color="#999" 
                                    style={styles.eyeIcon} 
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>

                    <TouchableOpacity 
                        style={[styles.button, isLoading && styles.buttonDisabled]} 
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.registerText}>
                            New to get recipes? <Text style={styles.registerLink}>Register Now</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 12,
        color: '#FFFFFF',
        marginBottom: 15
    },
    passwordContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 15
    },
    passwordInput: {
        flex: 1,
        color: '#FFFFFF'
    },
    eyeIcon: {
        marginLeft: 10
    },
    button: {
        backgroundColor: '#007A4D',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    registerText: {
        color: '#CCCCCC',
        fontSize: 14,
        textAlign: 'center'
    },
    registerLink: {
        color: '#FFAA00',
        fontWeight: 'bold'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#FF4444'
    },
    errorText: {
        color: '#FF4444',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5
    },
    buttonDisabled: {
        opacity: 0.7
    }
});