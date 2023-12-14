import React, { useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./Friends.style";

function Friends({ navigation, data }) {
    const { user } = data;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Friends List</Text>
            </View>

            {user.friends.map((friend) => (
                <TouchableOpacity
                    key={friend.id}
                    style={styles.friendContainer}
                    onPress={() => navigation.navigate("UserProfile", { userId: friend.id } )}
                >
                    <Image style={styles.logoContainer} source={{ uri: friend.profilePic }} />
                    <Text style={{ color: "white", fontSize: 22 }}>{friend.username}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Friends;