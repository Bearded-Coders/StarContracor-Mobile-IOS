import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    FlatList
} from "react-native";
import { images, COLORS, SIZES } from "../../constants";
import styles from "./JobBoard.style";
import jobHandler from "../../utils/jobHandler";
import { JobCards } from "../../components";



const JobBoard = ({ navigation, data}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState({});

    const { changesMade } = data


    const fetchJobs = async (currentPage) => {
        const response = await jobHandler.fetchAllJobs(currentPage);
        const activeJobsData = response.jobs.filter(job => job.jobStatus === 'Active');
        setJobs(activeJobsData);
        setTotalPages(response.totalPages);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchJobs(currentPage);
    }, [currentPage, changesMade]);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={() => navigation.navigate('CreateJob')}
            >
                <Text>Create Job</Text>
            </TouchableOpacity>

            <ScrollView
                contentContainerStyle={styles.scrollContentContainer} // Add contentContainerStyle
            >
                {isLoading ? (
                    <ActivityIndicator
                        style={styles.actInd}
                        size="large"
                        color={COLORS.primary}
                    />
                ) : (
                    <FlatList
                        data={jobs}
                        renderItem={({ item }) => (
                            <JobCards item={item} navigation={navigation} />
                        )}
                        keyExtractor={(item) => item?.id}
                        contentContainerStyle={{ columnGap: SIZES.medium, flexDirection: "column", width: "100%" }}
                        horizontal
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default JobBoard;