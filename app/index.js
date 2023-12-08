import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import HomeScreen from '../pages/HomeScreen/HomeScreen.jsx';
import JobBoard from '../pages/JobBoard/JobBoard.jsx';
import Login from '../pages/Login/Login.jsx';
import Signup from '../pages/Signup/Signup.jsx';
import Auth from '../utils/auth.js';
import userHandler from '../utils/userHandler.js';
import { COLORS, icons, images } from '../constants';
import { ScreenHeaderBtn } from '../components';
import JobDetails from '../pages/JobDetails/JobDetails.jsx';

const Stack = createStackNavigator();
const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [changesMade, setChangesMade] = useState(false);

    async function fetchUserData(userId) {
        const response = await userHandler.fetchUserData(userId);
        if (response) {
            setUser(response);
        }
    }

    async function checkLoggedIn() {
        try {
            const loggedIn = await Auth.loggedIn();
            setIsLoggedIn(loggedIn);

            // Use await to get the value of userId
            const id = await SecureStore.getItemAsync('userId');
            if (loggedIn) {
                await fetchUserData(id);
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }

    function getProfilePic() {
        if (isLoggedIn) {
            return { uri: user.profilePic }
        } else {
            return images.profile
        }
    }

    useEffect(() => {
        checkLoggedIn();
        setChangesMade(false);
    }, [isLoggedIn, changesMade]);

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.black,
                    },
                    headerShadowVisible: false,
                    headerTitle: "",

                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.menu} dimension="60%"
                            isProfile={false}
                            setChangesMade={setChangesMade}
                            setIsLoggedIn={setIsLoggedIn}
                            changesMade={changesMade}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={getProfilePic()}
                            dimension="100%"
                            isProfile={true}
                            setChangesMade={setChangesMade}
                            setIsLoggedIn={setIsLoggedIn}
                            changesMade={changesMade}
                        />
                    ),
                }}
            >
                <Stack.Screen
                    name="Home">
                    {(props) =>
                        <HomeScreen
                            {...props}
                            isLoading={isLoading}
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            user={user}
                        />}
                </Stack.Screen>
                <Stack.Screen name="JobBoard">
                    {(props) =>
                        <JobBoard
                            {...props}
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            user={user}
                        />}
                </Stack.Screen>
                <Stack.Screen name="JobDetails">
                {(props) =>
                    <JobDetails
                        {...props}
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