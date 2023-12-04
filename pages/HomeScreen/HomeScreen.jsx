import React from "react";
import { View, ScrollView, SafeAreaView, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View>
            {/* Your screen content */}
            <Button
              title="Please login to use this app"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default HomeScreen;