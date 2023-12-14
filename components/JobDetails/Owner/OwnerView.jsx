import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import Comments from "../Comment/Comment";
import styles from "./OwnerView.style";
import StarRating from "../../StarRating/StarRating";
import applicantHandler from "../../../utils/applicantHandler";


function OwnerView(props) {
    const { navigation, jobDetails, categories, user, jobId, setChangesMade } = props.data
    dimension = "100%";


    // Accept a user
    const acceptApplicant = async (applicantId) => {
        await applicantHandler.acceptApplicant(jobId, applicantId);
        setChangesMade(true);
    }

    // Deny a user
    const denyApplicant = async (applicantId) => {
        await applicantHandler.denyApplicant(jobId, applicantId);
        setChangesMade(true);
    }

    // Remove a user
    const removeUser = async (acceptedId) => {
        await applicantHandler.removeUser(jobId, acceptedId);
        setChangesMade(true);
    };

    console.log(jobDetails)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{jobDetails.title}</Text>
                <Text style={styles.description}>{jobDetails.description}</Text>
            </View>

            {/* APPLICANT LIST */}
            <ScrollView style={styles.groupContainer}>
                <Text style={styles.label}>Applicants</Text>
                {jobDetails.applicantsList && jobDetails.applicantsList.map((applicant) => (
                    <View>
                        <TouchableOpacity 
                            style={styles.btnContainer} 
                            key={applicant.id}
                            onPress={() => navigation.navigate("UserProfile", { userId: applicant.id })}
                        >
                            <Image
                                source={{ uri: applicant.profilePic }}
                                resizeMode="cover"
                                style={styles.btnImg(dimension)}></Image>
                            <Text style={styles.btnLabel}>{applicant.username}</Text>
                            <Text style={styles.label}>
                                {applicant.avgRating != null ?
                                    <StarRating rating={parseInt(jobDetails.creator.avgRating)} /> : "N/A"}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.accept_deny}>
                            <TouchableOpacity style={styles.acceptBtn}>
                                <Text style={styles.btnLabel} onPress={() => acceptApplicant(applicant.id)}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.btnLabel} onPress={() => denyApplicant(applicant.id)}>Deny</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                ))}
            </ScrollView>

            {/* ACCEPTED LIST */}
            <ScrollView style={styles.groupContainer}>
                <Text style={styles.label}>Hired Users</Text>
                {jobDetails.acceptedList && jobDetails.acceptedList.map((applicant) => (
                    <View>
                        <TouchableOpacity 
                            style={styles.btnContainer} 
                            key={applicant.id}
                            onPress={() => navigation.navigate("UserProfile", { userId: applicant.id })}
                        >
                            <Image
                                source={{ uri: applicant.profilePic }}
                                resizeMode="cover"
                                style={styles.btnImg(dimension)}></Image>
                            <Text style={styles.btnLabel}>{applicant.username}</Text>
                            <Text style={styles.label}>
                                {applicant.avgRating != null ?
                                    <StarRating rating={parseInt(jobDetails.creator.avgRating)} /> : "N/A"}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.accept_deny}>
                            <TouchableOpacity onPress={() => removeUser(applicant.id)}>
                                <Text style={styles.btnLabel}>Remove User</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Comments data={props.data} />
        </ScrollView>
    )
}

export default OwnerView;