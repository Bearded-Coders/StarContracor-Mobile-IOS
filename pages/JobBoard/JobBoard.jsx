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
import PopularJobCard from "../../components/common/cards/popular/PopularJobCard";
import NearbyJobCard from "../../components/common/cards/nearby/NearbyJobCard";



const JobBoard = ({ navigation, isLoggedIn, user }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState({});

    const fetchJobs = async (currentPage) => {
        const response = await jobHandler.fetchAllJobs(currentPage);
        const activeJobsData = response.jobs.filter(job => job.jobStatus === 'Active');
        setJobs(activeJobsData);
        setTotalPages(response.totalPages);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchJobs(currentPage);
    }, [currentPage]);
    return (
        <ImageBackground
            source={images.grimBg}
            style={styles.container} // Add container styles
        >
            <View style={{ width: 300 }}>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.navigate('CreateJob')}
                >
                    <Text>Create Job</Text>
                </TouchableOpacity>
            </View>
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
                            <NearbyJobCard item={item} navigation={navigation} />
                        )}
                        keyExtractor={(item) => item?.id}
                        contentContainerStyle={{ columnGap: SIZES.medium, flexDirection: "column", width: "100%" }}
                        horizontal
                    />
                )}
            </ScrollView>
        </ImageBackground>
    );
};

export default JobBoard;