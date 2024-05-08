import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import ResponsiveSize from '../utils/responsiveSize';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
    <View style={styles.fields}>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={'white'}
      />
      </View>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      </View>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FEFAF6',
    padding: ResponsiveSize(20),
  },
  fields:{
   marginTop:ResponsiveSize(40)
  },
  inputContainer:{
    backgroundColor:'#3E3232',
    padding:ResponsiveSize(20),
    borderRadius:ResponsiveSize(8),
    marginVertical:ResponsiveSize(20)
  },
  input: {
    color:'white'
  },
  loginButton: {
    padding:ResponsiveSize(20),
    borderRadius:ResponsiveSize(8),
    backgroundColor:'#A87C7C',
  },
  loginButtonText: {},
});

export default Login;
