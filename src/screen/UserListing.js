import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import ResponsiveSize from '../utils/responsiveSize';
import {COLORS} from '../utils/constants';
import firestore from '@react-native-firebase/firestore';

const UserListing = ({navigation}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState([]);

  const getData = async () =>{
    try {
      const usersCollection = await firestore().collection('users').get();
      const data = usersCollection.docs.map(doc => ({
        ...doc.data(),
      }));
      setUserData(data);
    } catch (error) {
      
    }
  }

  const createDoc = async () => {
    if (name.trim() === '' || email.trim() === '') {
      Alert.alert('Error', 'Please enter both name and email');
      return;
    }
    try {
      await firestore().collection('users').add({
        name,
        email,
      });
      setName('');
      setEmail('');
      await getData();
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>List of users</Text>
        <View style={styles.inputCon}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={createDoc}>
            <Text style={styles.btnText}>ADD</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={userData}
          renderItem={({item}) => (
            <View style={styles.list}>
              <View style={styles.detailContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                <Image
                  source={require('../../assets/images/remove.png')}
                  style={styles.remove}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex:1,
    padding: ResponsiveSize(10),
    borderWidth: 1,
    margin: ResponsiveSize(15),
    borderRadius: ResponsiveSize(20),
    backgroundColor: COLORS.contain,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    marginTop: ResponsiveSize(80),
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  listHeading: {
    fontSize: ResponsiveSize(30),
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: COLORS.button,
    padding: ResponsiveSize(20),
    margin: ResponsiveSize(20),
    borderRadius: ResponsiveSize(10),
    marginBottom: '5%',
  },
  btnText: {
    fontSize: ResponsiveSize(20),
    color: COLORS.contain,
    textAlign: 'center',
  },
  profile: {
    width: ResponsiveSize(80),
    height: ResponsiveSize(80),
    borderRadius: ResponsiveSize(40),
  },
  detailContainer: {
    flex: 1,
    marginLeft: ResponsiveSize(30),
    justifyContent: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: ResponsiveSize(20),
  },
  email: {
    fontSize: ResponsiveSize(17),
  },
  remove: {
    width: ResponsiveSize(30),
    height: ResponsiveSize(30),
  },
  inputContainer: {
    backgroundColor: COLORS.field,
    padding: ResponsiveSize(15),
    borderRadius: ResponsiveSize(20),
    marginVertical: ResponsiveSize(10),
  },
  input: {
    color: COLORS.text,
    fontSize: ResponsiveSize(20),
    margin:ResponsiveSize(20),
    borderWidth:1
  },
});

export default UserListing;



// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {deleteUser, list} from '../store/userSlice';
// import ResponsiveSize from '../utils/responsiveSize';
// import {COLORS} from '../utils/constants';
// import firestore from '@react-native-firebase/firestore';

// const UserListing = ({navigation}) => {
//   const dispatch = useDispatch();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [userData, setUserData] = useState('');

//   // const listData = useSelector(state => state?.user);

//   // const getData = async () => {
//   //   const usersCollection = await firestore().collection('users').get();
//   //   const data = usersCollection.docs.map(doc => ({
//   //     ...doc.data(),
//   //   }));
//   //   console.log(data);
//   //   setUserData(data);
//   //     const userDocument =firestore().collection('users').add({
//   //     name: 'sejal',
//   //     email: 'vaishali@gmail.com',
//   //   })
//   // };

//   const getData = async () => {
//     if (name.trim() === '' || email.trim() === '') {
//       Alert.alert('Error', 'Please enter both name and email');
//       return;
//     }
//     try {
//       await firestore().collection('users').add({
//         name,
//         email,
//       });
//       setName('');
//       setEmail('');
//       const usersCollection = await firestore().collection('users').get();
//       const data = usersCollection.docs.map(doc => ({
//         ...doc.data(),
//       }));
//       setUserData(data);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   // useEffect(() => {
//   //   dispatch(list());
//   // }, [listData]);

//   const handleUserPress = userId => {
//     navigation.navigate('UserListingDetails', {userId});
//   };

//   // const handleDeleteUser = userId => {
//   //   dispatch(deleteUser(userId));
//   // };

//   return (
//     <View style={styles.container}>
//       <View style={styles.listContainer}>
//         <Text style={styles.listHeading}>List of users</Text>
//         <View style={styles.container}>
//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TouchableOpacity style={styles.buttonContainer} onPress={getData}>
//             <Text style={styles.btnText}>ADD</Text>
//           </TouchableOpacity>
//         </View>
//         <FlatList
//         style={{}}
//           data={userData}
//           renderItem={({item}) => (
//             <View style={styles.list}>
//               {/* <TouchableOpacity onPress={() => handleUserPress(item.id)}>
//                 <Image source={{uri: item.avatar}} style={styles.profile} />
//               </TouchableOpacity> */}
//               <View style={styles.detailContainer}>
//                 <Text style={styles.name}>
//                   {/* {item.first_name} {item.last_name} */}
//                   {item.name}
//                 </Text>
//                 <Text style={styles.email}>{item.email}</Text>
//               </View>
//               <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
//                 <Image
//                   source={require('../../assets/images/remove.png')}
//                   style={styles.remove}
//                 />
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//         {/* <TouchableOpacity
//           style={styles.buttonContainer}
//           onPress={() => navigation.navigate('Users')}>
//           <Text style={styles.btnText}>Continue to Next page</Text>
//         </TouchableOpacity> */}
//         {/* <Text style={{color: 'black'}}>{userData.email}</Text>
//         <Text style={{color: 'black'}}>{userData.name}</Text> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     padding: ResponsiveSize(10),
//     borderWidth: 1,
//     margin: ResponsiveSize(15),
//     borderRadius: ResponsiveSize(20),
//     backgroundColor: COLORS.contain,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   listContainer: {
//     marginTop: ResponsiveSize(80),
//     flex: 1,
//     flexDirection:'column',
//     justifyContent:'space-evenly'
//   },
//   listHeading: {
//     fontSize: ResponsiveSize(30),
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     backgroundColor: COLORS.button,
//     padding: ResponsiveSize(20),
//     margin: ResponsiveSize(20),
//     borderRadius: ResponsiveSize(10),
//     marginBottom: '5%',
//   },
//   btnText: {
//     fontSize: ResponsiveSize(20),
//     color: COLORS.contain,
//     textAlign: 'center',
//   },
//   profile: {
//     width: ResponsiveSize(80),
//     height: ResponsiveSize(80),
//     borderRadius: ResponsiveSize(40),
//   },
//   detailContainer: {
//     flex: 1,
//     marginLeft: ResponsiveSize(30),
//     justifyContent: 'center',
//   },
//   name: {
//     fontWeight: '700',
//     fontSize: ResponsiveSize(20),
//   },
//   email: {
//     fontSize: ResponsiveSize(17),
//   },
//   remove: {
//     width: ResponsiveSize(30),
//     height: ResponsiveSize(30),
//   },
//   inputContainer: {
//     backgroundColor: COLORS.field,
//     padding: ResponsiveSize(15),
//     borderRadius: ResponsiveSize(20),
//     marginVertical: ResponsiveSize(10),
//   },
//   input: {
//     color: COLORS.text,
//     fontSize: ResponsiveSize(20),
//     margin:ResponsiveSize(20),
//     borderWidth:1
//   },
// });

// export default UserListing;

