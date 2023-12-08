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
}

export default new JobHandler;