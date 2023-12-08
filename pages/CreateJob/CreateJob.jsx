import React, { useState } from 'react';
import { ScrollView, View ,Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from 'react-native-elements';
import jobHandler from '../../utils/jobHandler';
import { COLORS } from '../../constants';

const CreateJob = ({ navigation, isLoggedIn, user }) => {
  const createdDate = new Date().toLocaleDateString();

  const createJob = async (data) => {
    const response = await jobHandler.createJob(data);

    if (response) {
      setTimeout(() => {
        navigation.replace('JobBoard');
      }, 2000);
    }
  };

  const categories = [
    { label: 'Bounties', value: 'bounty_hunting' },
    { label: 'Illegal', value: 'illegal' },
    { label: 'Mining', value: 'mining' },
    { label: 'Combat', value: 'combat' },
    { label: 'Salvage', value: 'salvage' },
    { label: 'Trading', value: 'trading' },
    { label: 'Exploring', value: 'exploring' },
    { label: 'Delivery', value: 'delivery' },
    { label: 'PVP', value: 'pvp' },
    { label: 'PVE', value: 'pve' },
    { label: 'RolePlay', value: 'rolePlay' },
  ];

  const [formData, setFormData] = useState({
    creatorId: user?.id,
    title: '',
    description: '',
    createdDate: createdDate,
    startDate: '',
    jobStatus: 'Active',
    threat: 'Low',
    paymentPercent: '',
    creatorEmail: user?.email,
    startLocation: '',
    distance: '',
    bounty_hunting: false,
    illegal: false,
    mining: false,
    combat: false,
    salvage: false,
    trading: false,
    exploring: false,
    delivery: false,
    pvp: false,
    pve: false,
    rolePlay: false,
  });

  const handleInputChange = (name, value, type) => {
    const newValue = type === 'checkbox' ? !formData[name] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = () => {
    const data = {
      creatorId: formData.creatorId,
      title: formData.title,
      description: formData.description,
      createdDate: formData.createdDate,
      startDate: formData.startDate,
      jobStatus: formData.jobStatus,
      threat: formData.threat,
      paymentPercent: formData.paymentPercent,
      creatorEmail: formData.creatorEmail,
      startLocation: formData.startLocation,
      distance: formData.distance,
      bounty_hunting: formData.bounty_hunting,
      illegal: formData.illegal,
      mining: formData.mining,
      combat: formData.combat,
      salvage: formData.salvage,
      trading: formData.trading,
      exploring: formData.exploring,
      delivery: formData.delivery,
      pvp: formData.pvp,
      pve: formData.pve,
      rolePlay: formData.rolePlay,
    };

    createJob(data);
  };

  return (
    <ScrollView style={styles.container}>
      {/* TITLE */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        maxLength={30}
        value={formData.title}
        placeholder="Bounties"
        placeholderTextColor="white"
        onChangeText={(value) => handleInputChange('title', value)}
      />

      {/* DESCRIPTION */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textArea}
        multiline
        value={formData.description}
        placeholder="Grouping up for ERT's"
        placeholderTextColor="white"
        maxLength={200}
        onChangeText={(value) => handleInputChange('description', value)}
      />

      {/* START DATE */}
      <Text style={styles.label}>Start Date</Text>
      <TextInput
        style={styles.input}
        value={formData.startDate}
        placeholder="mm/dd/yyyy"
        placeholderTextColor="white"
        onChangeText={(value) => handleInputChange('startDate', value)}
      />

      {/* THREAT LEVEL */}
      <Text style={styles.label}>Threat Level</Text>
      <Picker
        selectedValue={formData.threat}
        onValueChange={(value) => handleInputChange('threat', value)}
      >
        <Picker.Item color='white' label="Low" value="Low" />
        <Picker.Item color='white' label="Medium" value="Medium" />
        <Picker.Item color='white' label="High" value="High" />
        <Picker.Item color='white' label="Very High" value="Very High" />
        <Picker.Item color='white' label="Extreme" value="Extreme" />
      </Picker>

      {/* PAYMENT PERCENT */}
      <Text style={styles.label}>Payment Percent</Text>
      <TextInput
        style={styles.input}
        value={formData.paymentPercent}
        keyboardType="numeric"
        placeholder="20%"
        placeholderTextColor="white"
        onChangeText={(value) => handleInputChange('paymentPercent', value)}
      />

      {/* STARTING LOCATION */}
      <Text style={styles.label}>Starting Location</Text>
      <TextInput
        style={styles.input}
        value={formData.startLocation}
        placeholder="Starting location"
        placeholderTextColor="white"
        onChangeText={(value) => handleInputChange('startLocation', value)}
      />

      {/* DISTANCE TO TRAVEL */}
      <Text style={styles.label}>Distance to Travel</Text>
      <TextInput
        style={styles.input}
        value={formData.distance}
        placeholder="40 m/km"
        placeholderTextColor="white"
        onChangeText={(value) => handleInputChange('distance', value)}
      />

      {/* CATEGORIES */}
      <Text style={styles.label}>Categories</Text>
      <View style={styles.categoriesContainer}>
        <View style={styles.categoryRow}>
          {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
            <CheckBox
              key={category.value}
              title={category.label}
              checked={formData[category.value]}
              onPress={() => handleInputChange(category.value, null, 'checkbox')}
              tintColor="black"
              hideBox="true"
            />
          ))}
        </View>
        <View style={styles.categoryRow}>
          {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
            <CheckBox
              key={category.value}
              title={category.label}
              checked={formData[category.value]}
              onPress={() => handleInputChange(category.value, null, 'checkbox')}
              tintColors={{ true: '#F15927', false: 'black' }}
            />
          ))}
        </View>
      </View>
      {/* SUBMIT BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{color: COLORS.white, fontSize: 18}}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: COLORS.black,
    flex: 1,
    padding: 20,
    color: COLORS.white
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center"
  },
  picker: {
    // backgroundColor: 'rgba(169, 169, 169, 0.8)',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    color: COLORS.black,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: 'rgba(169, 169, 169, 0.8)',
    height: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    color: COLORS.white
  },
  textArea: {
    backgroundColor: 'rgba(169, 169, 169, 0.8)',
    height: 80,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 10
  },
  categoryColumn: {
    flex: 1,
    minWidth: '48%', // Adjust the width as needed
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.black,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 100
  },
  checkbox: {
    backgroundColor: 'rgba(169, 169, 169, 0.8)',
    color: COLORS.white
  }
};

export default CreateJob;