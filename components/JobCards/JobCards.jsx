import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './JobCards.style'

const JobCards = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('JobDetails', { jobId: item.id })}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image 
          source={{ uri: item.creator.profilePic}}
          resizeMode='contain'
          style={styles.logImage} 
          />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName}>{item?.title}</Text>
        <Text style={styles.jobType}>Payment: {item?.paymentPercent}%</Text>
      </View>
    </TouchableOpacity>
  )
}

export default JobCards;