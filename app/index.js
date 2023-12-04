import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen/HomeScreen.jsx';
import Login from '../pages/Login/Login.jsx';

import { COLORS, icons, images, SIZES } from '../constants';

import styles from './Header.style.js';

import { ScreenHeaderBtn } from '../components';

const Stack = createStackNavigator();
const Home = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Home;