import React, {useEffect,useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  createUser,
  fetchDetails,
  updateUser,
  updateUserPatch,
} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';

const UserDetails = ({route, navigation}) => {
  const {userIdDetails} = route.params;
  const dispatch = useDispatch();
  const userDetail = useSelector(state =>
    state?.additionalData?.find(user => user.id === userIdDetails),
  );
  const [createdUser, setCreatedUser] = useState(null);

  const handleCreateUser = () => {
    dispatch(createUser({name: 'morpheus', job: 'leader'})).then(result => {
      if (!result.error) {
        setCreatedUser(result.payload);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchDetails(userIdDetails));
  }, [dispatch, userIdDetails]);

  const handleUpdateUserPut = () => {
    dispatch(
      updateUser({
        userId: userIdDetails,
        name: 'Updated Name',
        job: 'Updated Job',
      }),
    ).then(result => {
      if (!result.error) {
        console.log('Update User PUT Response:', result.payload);
      } else {
        console.error('Error updating user:', result.error);
      }
    });
  };

  const handleUpdateUserPatch = () => {
    dispatch(
      updateUserPatch({
        userId: userIdDetails,
        name: 'Patched Name',
        job: 'Patched Job',
      }),
    ).then(result => {
      if (!result.error) {
        console.log('Update User PATCH Response:', result.payload);
      } else {
        console.error('Error updating user:', result.error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack('')}
        style={styles.backButtonContainer}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      {userDetail && (
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>Name:{userDetail.name}</Text>
            <Text style={styles.emailText}>Year:{userDetail.year}</Text>
            <Text style={styles.emailText}>Color:{userDetail.color}</Text>
            <Text style={styles.emailText}>
              Patone Value:{userDetail.pantone_value}
            </Text>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={handleCreateUser} style={styles.addButton}>
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>
      {createdUser && (
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>New Name: {createdUser.name}</Text>
            <Text style={styles.emailText}>New Job: {createdUser.job}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9E8C9',
    padding: ResponsiveSize(20),
    justifyContent: 'center',
  },
  userContainer: {
    backgroundColor: 'white',
    padding: ResponsiveSize(50),
    borderRadius: ResponsiveSize(10),
    width: '100%',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
  },
  backButton: {
    fontSize: ResponsiveSize(18),
    marginBottom: ResponsiveSize(10),
  },
  detailsContainer: {
    // alignItems: 'center',
  },
  nameText: {
    fontSize: ResponsiveSize(24),
    fontWeight: 'bold',
    marginBottom: ResponsiveSize(10),
  },
  emailText: {
    fontSize: ResponsiveSize(18),
    marginBottom: ResponsiveSize(10),
  },
  avatar: {
    width: ResponsiveSize(120),
    height: ResponsiveSize(120),
    borderRadius: ResponsiveSize(60),
  },
  addButton: {
    padding: ResponsiveSize(15),
    marginHorizontal: ResponsiveSize(100),
    alignItems: 'center',
    marginVertical: ResponsiveSize(20),
    borderWidth: 1,
    borderRadius:ResponsiveSize(8),
    shadowOpacity:0.5,
    backgroundColor:'white'
  },
  buttonText: {
    fontSize: ResponsiveSize(25),
  },
});

export default UserDetails;
