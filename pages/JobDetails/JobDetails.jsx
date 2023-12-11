import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import jobHandler from '../../utils/jobHandler';
import styles from './JobDetails.style';

const JobDetails = ({ navigation, data }) => {
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  const jobId = route.params?.jobId;

  const fetchJobDetails = async (jobId) => {
    try {
      const response = await jobHandler.fetchJobDetails(jobId);
      console.log(response)
      setJobDetails(response);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails(jobId);
  }, [jobId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{jobDetails?.title}</Text>
      <Text style={styles.description}>{jobDetails?.description}</Text>

      <View style={styles.groupContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{jobDetails?.startDate}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Start Location:</Text>
          <Text style={styles.value}>{jobDetails?.startLocation}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{jobDetails?.distance} m/km</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Threat Level:</Text>
          <Text style={styles.value}>{jobDetails?.threat}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Pay Split:</Text>
          <Text style={styles.value}>{jobDetails?.paymentPercent}%</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Job Status:</Text>
          <Text style={styles.value}>{jobDetails?.jobStatus}</Text>
        </View>
      </View>
      
    </ScrollView >
  );
};

export default JobDetails;