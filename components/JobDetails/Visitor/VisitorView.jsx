import React from "react";
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import StarRating from "../../StarRating/StarRating";
import { COLORS } from "../../../constants";
import styles from "./VisitorView.style";
import jobHandler from "../../../utils/jobHandler";

function VisitorView(props) {
    const { navigation, jobDetails, categories, user, jobId, setChangesMade } = props.data

    const userIsApplicant = jobDetails.applicantsList && jobDetails.applicantsList.some(applicant => applicant.id === user.id);
    const userIsAccepted = jobDetails.acceptedList && jobDetails.acceptedList.some(accepted => accepted.id === user.id);

    console.log(jobDetails)
    const convertDate = (createdDateArray) => {
        // Convert the array to a Date object
        const createdDate = new Date(...createdDateArray);
        return createdDate.toLocaleDateString();
    }

    const apply = async () => {
        console.log("Apply was clicked")
        const data = await jobHandler.applyToJob(user.id, jobId);
        if (data) {
            setChangesMade(true);
        }
    }

    const leave = async (e) => {
        e.preventDefault();
        const data = await jobHandler.leaveJob(user.id, jobId);
        if (data) {
            setChangesMade(true);
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "space-between" }}>
            <View style={styles.header}>
                <Text style={styles.title}>{jobDetails.title}</Text>
                <Text style={styles.description}>{jobDetails.description}</Text>
            </View>

            <View style={styles.groupContainer}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Start Date:</Text>
                    <Text style={styles.value}>{jobDetails.startDate}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Start Location:</Text>
                    <Text style={styles.value}>{jobDetails.startLocation}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Distance:</Text>
                    <Text style={styles.value}>{jobDetails.distance} m/km</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Threat Level:</Text>
                    <Text style={styles.value}>{jobDetails.threat}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Pay Split:</Text>
                    <Text style={styles.value}>{jobDetails.paymentPercent}%</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Job Status:</Text>
                    <Text style={styles.value}>{jobDetails.jobStatus}</Text>
                </View>
            </View>

            <View style={styles.groupContainer}>
                <Text style={styles.label}>Created By: {jobDetails.creator.username} on {convertDate(jobDetails?.createdDate)} </Text>
            </View>

            <View style={styles.groupContainer}>
                <Text style={styles.label}>
                    Creators AvgRating:
                    {jobDetails.creator.avgRating != null ?
                        <StarRating rating={parseInt(jobDetails.creator.avgRating)} /> : "N/A"}
                </Text>
            </View>

            <View style={styles.groupContainer}>
                <View style={styles.categoriesContainer}>
                    {Object.entries(categories[0]).map(([categoryName, categoryValue], index) => (
                        categoryValue ? (
                            <Text key={index} style={styles.label} to="#">
                                #{categoryName}
                            </Text>
                        ) : null
                    ))}
                </View>
            </View>

            <View className="apply-leave">
                {jobDetails.jobStatus === "Complete" ? (
                    <View>
                    </View>
                ) : (
                    <View>
                        {userIsAccepted || userIsApplicant ? (
                            <TouchableOpacity style={styles.button} onPress={leave}>
                                <Text style={{ color: COLORS.white, fontSize: 18 }}>Leave Job</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={apply}>
                                <Text style={{ color: COLORS.white, fontSize: 18 }}>Apply</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>

        </ScrollView >
    );
}

export default VisitorView;