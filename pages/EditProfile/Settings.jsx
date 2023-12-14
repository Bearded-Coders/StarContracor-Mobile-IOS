import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import styles from './Settings.style'

function Settings({ navigation, data }) {
    const { user } = data
    return (
        <View>
            <Text style={{ color: "white", fontSize: 22, textDecorationLine: "underline" }}>Account Preferences</Text>
            {/* Update Username and Starting Location */}
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("UpdateInfo")}
            >
                <Text style={{ color: "white", fontSize: 22 }}>Update Information</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={{ color: "white", margin: 3 }}>{user.username}</Text>
                    <Text style={{ color: "white", margin: 3 }}>{user.email}</Text>
                </View>
            </TouchableOpacity>

            {/* Udpate Language */}
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: "white", fontSize: 22 }}>Language</Text>
                <Text style={{ color: "white", margin: 5 }}>Update your language settings</Text>
            </TouchableOpacity>

            {/* Update Verifications */}
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: "white", fontSize: 22 }}>Verifications</Text>
                <Text style={{ color: "white", margin: 5 }}>XXX</Text>
            </TouchableOpacity>

            <Text style={{ color: "white", fontSize: 22, textDecorationLine: "underline", marginTop: 5 }}>Signin & Security</Text>
            {/* Update  Password*/}
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: "white", fontSize: 22 }}>Update or Change Password</Text>
                <Text style={{ color: "white", margin: 5 }}>**********</Text>
            </TouchableOpacity>

            {/* Enable/Disable TFA */}
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: "white", fontSize: 22 }}>Two Factor</Text>
                <Text style={{ color: "white", margin: 5 }}>Not Enrolled</Text>
            </TouchableOpacity>

            {/* Change Associated phone number/email */}
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: "white", fontSize: 22 }}>Phone & Email</Text>
                <Text style={{ color: "white", margin: 5 }}>{user.email}</Text>
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, textDecorationLine: "underline", marginTop: 5 }}>Notifications</Text>
            <Text style={{ color: "white" }}>Coming Soon</Text>
        </View>
    )
}

export default Settings;