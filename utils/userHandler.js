import Auth from "./auth";

class UserHandler {
    // Retrieve the user's data
    async fetchUserData(userId) {
        const url = `http://192.168.2.184:8082/profile/${userId}`;
        const token = await Auth.getToken();
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Set the content type if needed
                    'Authorization': `Bearer ${token}` // Include authorization header if required
                },
                credentials: 'include'
            });
        

            if (response.status === 200) {
                const data = await response.json();
                return data;
            } else if (response.status === 401) {
                Auth.logout();
                const error = await response.text();
                console.log(error);
                return false;
            } else if (response.status === 500) {
                const error = await response.text();
                console.log(error);
                return false;
            } else {
                const error = await response.text();
                console.log(error);
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default new UserHandler;