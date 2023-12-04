import { AsyncStorage } from 'react-native';
import CookieManager from 'react-native-cookies';

class AuthService {
    loggedIn() {
        
    }

    async handleLogin() {
        const responseCookies = await CookieManager.get('your_backend_domain');

        // Store cookies in AsyncStorage
        await setCookies(responseCookies);
    };

    async setCookies(responseCookies) {
        await AsyncStorage.setItem('userCookies', JSON.stringify(responseCookies));
    }

}