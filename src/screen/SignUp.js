import React, {useState} from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import ResponsiveSize from '../utils/responsiveSize';
import {register} from '../store/userSlice';
import {useDispatch} from 'react-redux';
import { COLORS } from '../utils/constants';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();

  const handleRegistration = () => {
    dispatch(register({email, password, firstName, lastName})).then(result => {
      if (result.payload && result.payload.token) {
        navigation.navigate('UserListing');
      } else {
        console.log('Signup failed');
        Alert.alert('please enter the password');
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/backgroundlight.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.fields}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor={'white'}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="FirstName"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              placeholderTextColor={'white'}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="LastName"
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
              placeholderTextColor={'white'}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={'white'}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleRegistration}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text style={styles.question}>Already have an account </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.sign}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fields: {
    marginTop: '45%',
    padding: ResponsiveSize(20),
  },
  inputContainer: {
    backgroundColor: COLORS.field,
    padding: ResponsiveSize(20),
    borderRadius: ResponsiveSize(20),
    marginVertical: ResponsiveSize(10),
  },
  input: {
    color: COLORS.contain,
    fontSize: ResponsiveSize(20),
  },
  loginButton: {
    padding: ResponsiveSize(20),
    borderRadius: ResponsiveSize(20),
    backgroundColor: COLORS.login,
    marginTop: ResponsiveSize(20),
  },
  loginButtonText: {
    color: COLORS.contain,
    fontSize: ResponsiveSize(20),
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: ResponsiveSize(20),
  },
  question: {
    fontSize: ResponsiveSize(15),
  },
  sign: {
    fontSize: ResponsiveSize(15),
    fontWeight: '700',
    color: COLORS.field,
  },
});

export default SignUp;
