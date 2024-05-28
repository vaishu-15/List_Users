import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
  Image
} from 'react-native';
import ResponsiveSize from '../utils/responsiveSize';
import {useDispatch} from 'react-redux';
import {login} from '../store/userSlice';
import {COLORS} from '../utils/constants';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const dispatch = useDispatch();

   useEffect(() => {
     GoogleSignin.configure({
       webClientId:
         '326657361812-ovn5hd4460joj4s4mpmv7u7fm0bj9r5a.apps.googleusercontent.com',
     });
   }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = await userInfo.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      console.log('User signed in:', userInfo);
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened', error);
      }
    }
  };

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
              placeholderTextColor={COLORS.contain}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={COLORS.contain}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleLogin} onPress={signIn}>
          <Image source={require('../../assets/images/google.png')}
          style={{width:ResponsiveSize(50),height:ResponsiveSize(50)}}/>
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
  },
  fields: {
    marginTop: '60%',
    padding: ResponsiveSize(20),
  },
  inputContainer: {
    backgroundColor: COLORS.field,
    padding: ResponsiveSize(15),
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
  googleLogin:{
    marginVertical:ResponsiveSize(20),
    alignSelf:'center'
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

export default Login;
