import { Alert } from "react-native";
import auth from "./auth";

class commentHandler {
    async addComment(jobId, body) {
        const url = `http://192.168.2.239:8082/comment/${jobId}/add-comment`;
        const token = await auth.getToken();

        // console.log("Url: " + url, "JobID: " + jobId, "Token: " + token, "Body: " + body);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if needed
                'Authorization': `Bearer ${token}` // Include authorization header if required
            },
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (!response.ok) {
            Alert.alert("There was an issue submitting your comment")
        } else {
            const data = await response.text();
            Alert.alert(`${data}`);
        }
    }

    async deleteComment(jobId, commentId) {
        const url = `http://192.168.2.239:8082/comment/${jobId}/delete/${commentId}`;
        const token = await auth.getToken();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if needed
                'Authorization': `Bearer ${token}` // Include authorization header if required
            },
            credentials: 'include'
        });

        if (!response.ok) {
            Alert.alert(`Error removing comment`);
        } else {
            const data = await response.text();
            Alert.alert(`${data}`);
        }
    }
}

export default new commentHandler;