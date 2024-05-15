import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import ResponsiveSize from '../utils/responsiveSize';
import {COLORS} from '../utils/constants';

const Welcome = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
      <View style={styles.welcomeImg}>
        <Image
          source={require('../../assets/images/working.png')}
          style={styles.img}
          resizeMode='center'
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  welcomeContainer: {
    // marginHorizontal:ResponsiveSize(20)
  },
  welcome: {
    color: '#803D3B',
    fontSize: ResponsiveSize(40),
    fontWeight: '700',
    marginTop: ResponsiveSize(20),
  },
  welcomeImg: {
     alignSelf: 'center',
    //  backgroundColor:'black',
     margin:ResponsiveSize(-50),
     alignItems:'center',
  },
  img: {
    // width:ResponsiveSize(00)
  },
  btn: {
    alignItems: 'center',
    backgroundColor: COLORS.button,
    padding: ResponsiveSize(20),
    width: '90%',
    borderRadius: ResponsiveSize(8),
  },
  btnText: {
    color: COLORS.contain,
    fontSize: ResponsiveSize(20),
  },
});

export default Welcome;
