import { Alert } from 'react-native';

class JobHandler {
    async fetchAllJobs(currentPage) {
        const url = `http://192.168.2.184:8082/jobs/postings?page=${currentPage}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'include'
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
        const url = `http://localhost:8082/jobs/createjob`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        console.log(response);
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
}

export default new JobHandler;