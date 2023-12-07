import React from 'react';
import { Text } from 'react-native';
import styles from './StarRating.style';

const StarRating = ({ rating }) => {
    const maxRating = 5; // Maximum number of stars
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        const starColor = i <= rating ? '#FFD700' : '#D3D3D3'; // Filled or empty star color

        stars.push(
            <Text key={i} style={{ color: starColor, fontSize: 18 }}>
                ★
            </Text>
        );
    }

    return <Text style={styles.starRating}>{stars}</Text>;
};

export default StarRating;