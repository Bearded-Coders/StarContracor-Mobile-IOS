import decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

class AuthService {

  async getToken() {
    const token = await SecureStore.getItemAsync('jwt');
    return token;
  }

  async loggedIn() {
    try {
      const token = await SecureStore.getItemAsync('jwt');

      if (token) {
        // Only return true if the token is not expired
        return !this.isTokenExpired(token);
      } else {
        // Token is empty or undefined
        return false;
      }
    } catch (error) {
      // Log the error and return false
      console.log('Error checking login status:', error);
      return false;
    }
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      this.logout();
      return true;
    }
    return false;
  }

  async logout() {
   const response = await fetch("http://192.168.2.249:8082/auth/logout", {
      method: 'POST',
      credentials: 'include'
    });

    const res = await response.text();
    console.log(res);
    // Remove the JWT token from secure store to log the user out
    await SecureStore.deleteItemAsync('jwt');
    await SecureStore.deleteItemAsync('userId');
  }

  async handleLogin(userData, setIsLoggedIn) {
    const data = {
      usernameOrEmail: userData.email,
      password: userData.password
    };

    try {
      const response = await fetch("http://192.168.2.249:8082/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      
      if (response.status === 401) {
        const message = await response.text();
        console.log(message);
        Alert.alert("Invalid Username or Password");
        return false;
      } else if (response.status === 500) {
        const message = await response.text();
        console.log(message);
        Alert.alert("Something Went Wrong, Try Again Later");
        return false;
      } else if (response.ok) {
        const res = await response.json();
        console.log(res.jwt);
        // Save the JWT token securely
        await SecureStore.setItemAsync('jwt', res.jwt);
        await SecureStore.setItemAsync('userId', res.userId);
        setIsLoggedIn(true);
        return true;
      } else {
        const message = await response.text();
        console.log(message);
        Alert.alert(message);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }
}

export default new AuthService();
