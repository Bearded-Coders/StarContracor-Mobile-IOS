import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import jobHandler from '../../utils/jobHandler';
import styles from './JobDetails.style';
import VisitorView from '../../components/JobDetails/Visitor/VisitorView';
import OwnerView from '../../components/JobDetails/Owner/OwnerView';
import Comments from '../../components/JobDetails/Comment/Comment';

const JobDetails = ({ navigation, data }) => {
  const [jobDetails, setJobDetails] = useState({
    applicantsList: [],
    acceptedList: [],
    creator: {},
    createdDate: [],
    comments: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const { user, setChangesMade, changesMade } = data;

  const userIsOwner = user.id == jobDetails.creator.id;

  const route = useRoute();
  const jobId = route.params?.jobId;

  const fetchJobDetails = async (jobId) => {
    try {
      setIsLoading(true);
      const response = await jobHandler.fetchJobDetails(jobId);
      setJobDetails(response);
      setCategories(response.categories || []);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails(jobId);
  }, [jobId, changesMade]);

  const props = { navigation, jobDetails, categories, user, jobId, setChangesMade }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (userIsOwner) {
    return (
      <OwnerView data={props} />
    )
  } else {
    return (
      <VisitorView data={props} />
    );
  }


};

export default JobDetails;