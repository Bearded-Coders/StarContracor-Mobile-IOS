import React, { useState } from 'react';
import { TouchableOpacity, Image, Modal, View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './screenheader.style';
import Auth from '../../utils/auth';

const ScreenHeaderBtn = ({ iconUrl, dimension, isProfile, data }) => {
  const { setChangesMade, setIsLoggedIn} = data
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigation = useNavigation();
  
  const nonProfileOptions = [
    { label: 'Home', value: 'option1' },
    { label: 'Ships', value: 'option2' },
    { label: 'Job Board', value: 'option3' },
  ];

  const profileOptions = [
    { label: 'Friends', value: 'option4' },
    { label: 'Edit Profile', value: 'option5' },
    { label: 'Logout', value: 'option6' },
  ];

  let dropdownOptions;

  if(isProfile) {
    dropdownOptions = profileOptions;
  } else {
    dropdownOptions = nonProfileOptions;
  }

  const handleButtonPress = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionPress = async (item) => {
    // Handle the option press as needed
    switch (item.value) {
      case "option1":
        navigation.navigate('Home');
        break;
      case "option3":
        navigation.navigate('JobBoard');
        break;
      case "option4":
        navigation.navigate("Friends");
        break;
      case 'option6':
        await Auth.logout();
        setIsLoggedIn(false);
        setChangesMade(true);
        break;
      // Add more cases as needed
      default:
        console.log('Selected item:', item);
    }
    setDropdownOpen(false);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity style={styles.btnContainer} onPress={handleButtonPress}>
        <Image source={iconUrl} resizeMode="cover" style={styles.btnImg(dimension)} />
      </TouchableOpacity>
      <Modal
      transparent={true}
      animationType="slide"
      visible={isDropdownOpen}
      onRequestClose={() => setDropdownOpen(false)}
    >
      <View style={modalStyles.container}>
        <View style={modalStyles.innerContainer}>
          {dropdownOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={modalStyles.option}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={modalStyles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={() => setDropdownOpen(false)} />
        </View>
      </View>
    </Modal>
    </View>
  );
};


const modalStyles = StyleSheet.create({
  container: {
    textAlign: "center",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: 'black',
    color: "white",
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust the width as needed
    alignItems: 'center', // Center items horizontally
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%', // Make the options take the full width
  },
  optionText: {
    textAlign: "center",
    color: "white",
  }
});

export default ScreenHeaderBtn;
