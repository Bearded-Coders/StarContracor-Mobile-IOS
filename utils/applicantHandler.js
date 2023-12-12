import { Alert } from "react-native";
import auth from "./auth";

class ApplicantHandler {
    async acceptApplicant(jobId, applicantId) {
        const url = `http://192.168.2.239:8082/applicant/${jobId}/accept/${applicantId}`;

        const token = await auth.getToken();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if needed
                'Authorization': `Bearer ${token}` // Include authorization header if required
            },
            credentials: 'include'
        });

        if (response.status === 500) {
            const error = await response.text();
            Alert.alert(`${error}`);
        } else if (response.status === 200) {
            const data = await response.text();
            Alert.alert(`${data}`);
            return data;
        } else if (response.status === 401) {
            auth.logout();
        } else {
            const data = await response.text();
            Alert.alert(`${data}`);
        }
    }

    async denyApplicant(jobId, applicantId) {
        const url = `http://192.168.2.239:8082/applicant/${jobId}/deny/${applicantId}`;

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
            const error = await response.text();
            Alert.alert(`${error}`);
        }

        const data = await response.text();
        Alert.alert(`${data}`);

        return data;
    }

    // Remove user from job
    async removeUser(jobId, userId) {
        const url = `http://192.168.2.239:8082/applicant/remove/${jobId}?userIdRemove=${userId}`

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
            const error = await response.text();
            Alert.alert(`${error}`);
        }

        Alert.alert(`User was removed from job`);
    }
}

export default new ApplicantHandler;