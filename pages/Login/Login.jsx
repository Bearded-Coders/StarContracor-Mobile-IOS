import React, { useState } from "react";
import { View, TextInput, Pressable, Text, ImageBackground } from "react-native";
import Auth from "../../utils/auth";
import { images } from "../../constants";
import styles from './Login.style'

const Login = ({ navigation, setIsLoggedIn }) => {
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const onPressLogin = async () => {
        const userData = {
            email: state.email,
            password: state.password
        }

      const response = await Auth.handleLogin(userData, setIsLoggedIn);
      console.log(response);
      if(response) {
        navigation.navigate('Home');
      }
    };

    const onPressForgotPassword = () => {
        // Do something about forgot password operation
    };



    return (
        <ImageBackground
            source={images.grimBg2}
            style={styles.container}
        >
            <Text style={styles.title}> Welcome Back </Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="white"
                    onChangeText={(text) =>
                        setState((prevState) => ({ ...prevState, email: text }))
                    }
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="white"
                    onChangeText={(text) =>
                        setState((prevState) => ({ ...prevState, password: text }))
                    }
                />
            </View>
            <Pressable
                onPress={onPressForgotPassword}>
                <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
            </Pressable>
            <Pressable
                onPress={onPressLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.forgotAndSignUpText}>Signup</Text>
            </Pressable>
        </ImageBackground>
    )
}

export default Login;