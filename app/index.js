import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import HomeScreen from '../pages/HomeScreen/HomeScreen.jsx';
import Login from '../pages/Login/Login.jsx';
import Signup from '../pages/Signup/Signup.jsx';
import Auth from '../utils/auth.js';
import userHandler from '../utils/userHandler.js';

const Stack = createStackNavigator();
const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState("");

    async function fetchUserData(userId) {
        const response = await userHandler.fetchUserData(userId);
        if(response) {
            setUser(response);
        }
    }

    async function checkLoggedIn() {
        try {
            const loggedIn = await Auth.loggedIn();
            setIsLoggedIn(loggedIn);

            // Use await to get the value of userId
            const id = await SecureStore.getItemAsync('userId');
            if(loggedIn) {
              await fetchUserData(id);
            } else {
                setIsLoggedIn(false);
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, [isLoggedIn]);

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home">
                    {(props) => 
                        <HomeScreen 
                            {...props} 
                            isLoading={isLoading} 
                            isLoggedIn={isLoggedIn} 
                            setIsLoggedIn={setIsLoggedIn} 
                            user={user}
                    />}
                </Stack.Screen>
                <Stack.Screen name="Login">
                    {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
                </Stack.Screen>
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Home;