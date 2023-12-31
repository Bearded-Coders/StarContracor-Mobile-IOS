import { Alert } from 'react-native';
import Auth from './auth';
import auth from './auth';

class JobHandler {
    async fetchAllJobs(currentPage) {
        const url = `http://192.168.2.239:8082/jobs/postings?page=${currentPage}`;

        const token = await Auth.getToken();

        return await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                Alert.alert(`${error}`)
            });
    }

    async fetchJobDetails(jobId) {
        const url = `http://192.168.2.239:8082/jobs/jobdetails/${jobId}`;

        const token = await Auth.getToken();

        return await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                Alert.alert(`${error}`)
            });
    }

    async createJob(data) {
        const token = await Auth.getToken();

        const url = `http://192.168.2.239:8082/jobs/createjob`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (response.status === 429) {
            Alert.alert(`Please wait before posting another job`)
        } else if (response.status === 401) {
            Alert.alert(`Unauthorized, please log in again`)
            Auth.logout();
        } else if (response.status === 200) {
            Alert.alert(`Job Has Been Submitted!`)
            return true;
        } else if (response.status === 400) {
            const data = await response.text();
            Alert.alert(`${data}`)
        } else {
            const error = await response.text();
            Alert.alert(`${error}`)
        }
    }

    async applyToJob(userId, jobId) {
        try {
            const url = `http://192.168.2.239:8082/applicant/apply/${jobId}?userId=${userId}`;

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
                Alert.alert("There was an issue applying to this job");
                return false;
            }

            const data = await response.text();
            Alert.alert(`${data}`);

            return data;
        } catch (error) {
            // Handle errors and display an error message if needed
            console.error('Error:', error);
        }
    }

    async leaveJob(userId, jobId) {
        const url = `http://192.168.2.239:8082/applicant/remove/${jobId}?userIdRemove=${userId}`;

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
            Alert.alert("There was an issue leaving this job");

            return false;
        }

        const data = await response.text();

        Alert.alert(`${data}`);

        return data;
    }
}

export default new JobHandler;