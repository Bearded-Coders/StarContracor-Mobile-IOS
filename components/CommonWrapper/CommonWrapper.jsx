import React, { useState } from 'react';
import { ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { images, COLORS } from '../../constants';

const CommonWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <ImageBackground
      source={images.grimBg} // Replace with your actual image source
      style={styles.container}
      onLoad={handleImageLoad}
    >
      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color={COLORS.primary} />
      ) : (
        children
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black
  },
});

export default CommonWrapper;
