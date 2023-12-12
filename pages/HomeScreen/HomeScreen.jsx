import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { StarRating } from "../../components";
import { images, COLORS } from "../../constants";
import styles from "./HomeScreen.style";

const HomeScreen = ({ navigation, data }) => {

  const { isLoading, isLoggedIn, user } = data
  // console.log("User: ", user)
  if (isLoggedIn) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainerUser}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <>
              <View styles={styles.userInfoContainer}>
                <Text style={styles.username}>Welcome Back {user.username}!</Text>
              </View>
              <View style={styles.ratingsContainer}>
                <Text style={styles.ratingHeader}>Ratings</Text>
                <Text style={styles.rating}>Average: {user.avgRating != null ? <StarRating rating={parseInt(user.avgRating)} /> : "N/A"}</Text>
                <Text style={styles.rating}>Host: {user.avgHostRating != null ? <StarRating rating={parseInt(user.avgHostRating)} /> : "N/A"}</Text>
                <Text style={styles.rating}>Applicant: {user.avgApplicantRating != null ? <StarRating rating={parseInt(user.avgApplicantRating)} /> : "N/A"}</Text>
              </View>

              <View style={styles.ratingsContainer}>
                <Text style={styles.ratingHeader}>Jobs</Text>
                <Text style={styles.rating}>Jobs Complete: {user.successfulJobsCompleted + user.failedJobsCompleted}</Text>
                <Text style={styles.rating}>Succesful Jobs: {user.successfulJobsCompleted}</Text>
                <Text style={styles.rating}>Failed Jobs: {user.failedJobsCompleted}</Text>
              </View>
            </>
          )}
        </ScrollView>
    )
  } else {
    return (
      <ImageBackground
        source={images.grimBg}  // Replace 'url_to_your_image' with the actual image URL or local resource
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              {/* Your screen content */}
              <TouchableOpacity
                style={[styles.button, styles.signupButton]}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
};

export default HomeScreen;