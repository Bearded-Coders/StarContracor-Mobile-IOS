import { Alert } from "react-native";
import Auth from "./auth";

class FriendHandler {
    // Add friend
    async AddFriend(userId, friendId) {
        const url = `http://192.168.2.249:8082/friend/${friendId}/add/${userId}`

        const token = await Auth.getToken();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if needed
                'Authorization': `Bearer ${token}` // Include authorization header if required
            },
            credentials: 'include'
        });

        if (!response.ok) {
            console.log(response)
            Alert.alert("Error Adding Friend");
            return false;
        } else {
            Alert.alert("Friend Request Sent!");
            return true;
        }
    }

    // Cancel Friend Request
    async cancelFriendRequest(requestId) {
        const url = `http://192.168.2.249:8082/friend/cancel-request/${requestId}`;

        const token = await Auth.getToken();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if needed
                'Authorization': `Bearer ${token}` // Include authorization header if required
            },
            credentials: 'include'
        });
        console.log(response)

        if (!response.ok) {
            Alert.alert("Error canceling request");
        } else {
            Alert.alert("Request has been canceled")
        }
    }

    // Accept Friend Request
    async acceptFriendrequest(requestId) {
        const url = `http://192.168.2.249:8082/friend/accept-friend-request/${requestId}`;

        const token = await Auth.getToken();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if needed
                'Authorization': `Bearer ${token}` // Include authorization header if required
            },
            credentials: 'include'
        });

        console.log(response);

        if (response.status === 200) {
            Alert.alert("User is now your friend");
        } else if (response.status === 500) {
            Alert.alert("Error accepting friend request");
        } else if (response.status === 401) {
            Auth.logout();
        } else {
            Alert.alert("Error, if the problem persist, please contact support");
        }
    }

    // Remove Friend
    async removeFriend(targetUserId, currentUserId) {
        const url = `http://192.168.2.249:8082/friend/${targetUserId}/remove/${currentUserId}`;

        const token = await Auth.getToken();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if needed
                'Authorization': `Bearer ${token}` // Include authorization header if required
            },
            credentials: 'include'
        });

        if (!response.ok) {
            Alert.alert("Error removing friend");
        } else {
            Alert.alert("Friend Removed!");
            return true;
        }
    }
}

export default new FriendHandler;