import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { images } from "../../constants";
import styles from './Signup.style'
import { ScrollView } from "react-native-gesture-handler";

const Signup = () => {
    const onPressSignUp = () => {
        // Implement your signup logic here
    };

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        startingArea: "",
    });

    const [selectedStartingArea, setSelectedStartingArea] = useState();

    return (
        <ImageBackground source={images.grimBg} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Sign Up</Text>

                {/* Dropdown Menu */}
                <View style={styles.inputView}>
                    <Picker
                        selectedValue={selectedStartingArea}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedStartingArea(itemValue)
                        }>
                        <Picker.Item label="Lorville" value="Lorville" />
                        <Picker.Item label="Area 18" value="Area 18" />
                        <Picker.Item label="Orison" value="Orison" />
                        <Picker.Item label="New Babbage" value="New Babbage" />
                    </Picker>
                </View>

                {/* Username */}
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username"
                        placeholderTextColor="white"
                        onChangeText={(text) => setState({ ...state, username: text })}
                    />
                </View>

                {/* Email */}
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="white"
                        onChangeText={(text) => setState({ ...state, email: text })}
                    />
                </View>

                {/* Password */}
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        onChangeText={(text) => setState({ ...state, password: text })}
                    />
                </View>


                <TouchableOpacity style={styles.signupBtn} onPress={onPressSignUp}>
                    <Text style={styles.signupBtnText}>Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

export default Signup;