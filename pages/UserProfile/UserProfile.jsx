import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import styles from "./UserProfile.style";
import friendHandler from "../../utils/friendHandler";
import { StarRating } from "../../components";
import userHandler from '../../utils/userHandler';


function UserProfile({ navigation, data }) {
    const { changesMade, setChangesMade, isLoading, setIsLoading, isLoggedIn, setIsLoggedIn, user } = data

    const [userData, setUserData] = useState({});

    const route = useRoute();
    const userId = route.params?.userId;

    const userIsFriend = userData && userData.friends?.some(dossierUser => dossierUser.id == user?.id); // Check if the current a viewed users are already friends

    const userRequested = userData && userData.receivedFriendRequest?.some(dossierUser => dossierUser.id == user?.id); // Check if the viewed user has recieved a friend request from current user

    const userSentRequest = userData && userData.sentFriendRequest?.some(dossierUser => dossierUser.id == user?.id); // Check if the viewed user has sent current user a friend request

    const getRequestId = (userId, friendRequests) => {
        const matchedUser = friendRequests.find(request => request.id === userId);
        return matchedUser ? matchedUser.requestId : null;
    };

    const addFriend = async () => {
        console.log("Add friend clicked")
        const resposne = await friendHandler.AddFriend(user.id, userData.id);
        if (resposne) {
            setChangesMade(true);
        }
    }

    const acceptFriendRequest = async () => {
        // Extract the requestId for the friend request
        const requestId = getRequestId(user.id, userData.sentFriendRequest);
        if (requestId) {
            await friendHandler.acceptFriendrequest(requestId);
            setChangesMade(true);
            // window.location.reload(true);
        } else {
            console.error('No matching friend request found for acceptFriendRequest');
        }

    };

    const denyFriendRequest = async () => {
        try {
            // Extract the requestId for the friend request
            const requestId = getRequestId(user.id, userData.sentFriendRequest);
            if (requestId) {
                await friendHandler.cancelFriendRequest(requestId);
                setChangesMade(true);
            } else {
                console.error('No matching friend request found for denyFriendRequest');
            }
        } catch (error) {
            console.error('Error denying friend request:', error);
        }
    };

    const cancelFriendRequest = async () => {
        // Extract the requestId for the friend request
        const requestId = getRequestId(user.id, userData.receivedFriendRequest);
        await friendHandler.cancelFriendRequest(requestId);
        setChangesMade(true);
    };

    const removeFriend = async () => {
        const res = await friendHandler.removeFriend(userData.id, user.id);
        if (res) setChangesMade(true);
    }

    const fetchUserProfile = async (userId) => {
        const data = await userHandler.fetchUserData(userId);
        if (userData) {
            setUserData(data);
        }
    }

    useEffect(() => {
        fetchUserProfile(userId)
    }, [changesMade]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logoContainer}
                    source={{ uri: userData.profilePic }}
                ></Image>
                <Text style={styles.headerText}>{userData.username}</Text>
            </View>

            {userIsFriend ? (
                <View style={styles.dblBtnContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "white", textAlign: "center" }}>Message <FontAwesomeIcon icon={faMessage} size={20} style={{ color: "white", textAlign: "center" }} /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={removeFriend}>
                        <Text style={{ color: "white", textAlign: "center" }}>Remove Friend</Text>
                    </TouchableOpacity>
                </View>
            ) : userSentRequest ? (
                <View style={styles.dblBtnContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => acceptFriendRequest()}>
                        <Text style={{ color: "white" }}>Accept Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => denyFriendRequest()}>
                        <Text style={{ color: "white" }}>Deny Request</Text>
                    </TouchableOpacity>
                </View>
            ) : userRequested ? (
                <TouchableOpacity style={styles.button} onPress={() => cancelFriendRequest()}>
                    <Text style={{ color: "white" }}>Cancel Request</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={() => addFriend()}>
                    <Text style={{ color: "white" }}>Add Friend</Text>
                </TouchableOpacity>
            )}

            {/* User Ratings */}
            <View style={styles.ratingsContainer}>
                <Text style={styles.ratingHeader}>Ratings</Text>
                <Text style={styles.rating}>Average: {userData.avgRating != null ? <StarRating rating={parseInt(userData.avgRating)} /> : "N/A"}</Text>
                <Text style={styles.rating}>Host: {userData.avgHostRating != null ? <StarRating rating={parseInt(userData.avgHostRating)} /> : "N/A"}</Text>
                <Text style={styles.rating}>Applicant: {userData.avgApplicantRating != null ? <StarRating rating={parseInt(userData.avgApplicantRating)} /> : "N/A"}</Text>
            </View>

            {/* User Job Data */}
            <View style={styles.ratingsContainer}>
                <Text style={styles.ratingHeader}>Jobs</Text>
                <Text style={styles.rating}>Jobs Complete: {userData.successfulJobsCompleted + userData.failedJobsCompleted}</Text>
                <Text style={styles.rating}>Succesful Jobs: {userData.successfulJobsCompleted}</Text>
                <Text style={styles.rating}>Failed Jobs: {userData.failedJobsCompleted}</Text>
            </View>

            {/* User Fleet */}
            <View style={styles.ratingsContainer}>
                <Text style={styles.ratingHeader}>{userData.username}'s Fleet</Text>
            </View>
        </ScrollView>
    )
}

export default UserProfile;