import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ResponsiveSize from '../utils/responsiveSize';

const Welcome = () => {


  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
      <View style={styles.Carousel}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  welcomeContainer: {
    padding: ResponsiveSize(100),
  },
  welcome: {
    color: 'white',
    fontSize: ResponsiveSize(40),
    fontWeight: '700',
  },
});

export default Welcome;
