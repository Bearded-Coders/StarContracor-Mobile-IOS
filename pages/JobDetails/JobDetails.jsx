import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const JobDetails = () => {
  const route = useRoute();
  const jobId = route.params?.jobId;

  console.log(jobId)
  // Fetch job details based on the jobId

  return (
    <View>
      <Text>Job Details Screen</Text>
      <Text>Job ID: {jobId}</Text>
      {/* Display other job details */}
    </View>
  );
}

export default JobDetails;