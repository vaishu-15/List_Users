import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import ResponsiveSize from '../utils/responsiveSize';
import {useDispatch} from 'react-redux';
import {login} from '../store/userSlice';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({email, password})).then(result => {
      if (result.payload && result.payload.token) {
        navigation.navigate('UserListing');
      } else {
        console.log('Login failed');
        Alert.alert('Wrong email and password');
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
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text style={styles.question}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.sign}>Sign Up</Text>
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
    // backgroundColor: '#FEFAF6',
  },
  fields: {
    marginTop: '60%',
    padding: ResponsiveSize(20),
  },
  inputContainer: {
    backgroundColor: '#3E323299',
    padding: ResponsiveSize(20),
    borderRadius: ResponsiveSize(20),
    marginVertical: ResponsiveSize(10),
  },
  input: {
    color: 'white',
    fontSize: ResponsiveSize(20),
  },
  loginButton: {
    padding: ResponsiveSize(20),
    borderRadius: ResponsiveSize(20),
    backgroundColor: '#A87C7C',
    marginTop: ResponsiveSize(20),
  },
  loginButtonText: {
    color: 'white',
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
    color: '#3E323299',
  },
});

export default Login;
