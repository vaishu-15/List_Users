import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import ResponsiveSize from '../utils/responsiveSize';
import { resetCache } from '../../metro.config';

const Welcome = (props) => {

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
      <TouchableOpacity style={styles.btn}  onPress={()=> props.navigation.navigate('Login')}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems:'center'
  },
  welcomeContainer: {
    padding: ResponsiveSize(100),
  },
  welcome: {
    color: '#E4C59E',
    fontSize: ResponsiveSize(40),
    fontWeight: '700',
    marginTop:ResponsiveSize(20)
  },
  btn:{
    alignItems:'center',
    backgroundColor:'#E4C59E',
    padding:ResponsiveSize(20),
    width:'90%',
    marginTop:'90%',
    borderRadius:ResponsiveSize(8)
  },
  btnText:{
    color:'black',
    fontSize:20
  }
});

export default Welcome;
