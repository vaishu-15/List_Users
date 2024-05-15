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
import { COLORS } from '../utils/constants';

const UserDetails = ({route, navigation}) => {
  const {userIdDetails} = route.params;
  const dispatch = useDispatch();
  const userDetail = useSelector(state =>
    state?.additionalData?.find(user => user.id === userIdDetails),
  );
  const [createdUser, setCreatedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [patchUpdatedUser, setPatchUpdatedUser] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handleCreateUser = () => {
    dispatch(createUser({name: 'morpheus', job: 'leader'})).then(result => {
      if (!result.error) {
        setCreatedUser(result.payload);
        setActionType('create');
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
        name: 'morpheus',
        job: 'zion resident',
      }),
    ).then(result => {
      if (!result.error) {
        setUpdatedUser(result.payload);
        setActionType('put');
      }
    });
  };

  const handleUpdateUserPatch = () => {
    dispatch(
      updateUserPatch({
        userId: userIdDetails,
        name: 'morpheus',
        job: 'zion resident',
      }),
    ).then(result => {
      if (!result.error) {
        setPatchUpdatedUser(result.payload);
        setActionType('patch');
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
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleCreateUser} style={styles.addButton}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleUpdateUserPut}
          style={styles.addButton}>
          <Text style={styles.buttonText}>Update(PUT)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleUpdateUserPatch}
          style={styles.addButton}>
          <Text style={styles.buttonText}>Update(PATCH)</Text>
        </TouchableOpacity>
      </View>
      {actionType === 'create' && createdUser && (
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}> Name: {createdUser.name}</Text>
            <Text style={styles.emailText}>Job: {createdUser.job}</Text>
          </View>
        </View>
      )}
      {actionType === 'put' && updatedUser && (
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>
              Name: {updatedUser.name}
            </Text>
            <Text style={styles.emailText}>Job: {updatedUser.job}</Text>
          </View>
        </View>
      )}
      {actionType === 'patch' && patchUpdatedUser && (
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>
              Name: {patchUpdatedUser.name}
            </Text>
            <Text style={styles.emailText}>
              Job: {patchUpdatedUser.job}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: ResponsiveSize(20),
    justifyContent: 'center',
  },
  userContainer: {
    backgroundColor: COLORS.contain,
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
    alignItems: 'center',
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
    padding: ResponsiveSize(10),
    alignItems: 'center',
    marginVertical: ResponsiveSize(20),
    borderWidth: 1,
    borderRadius: ResponsiveSize(8),
    shadowOpacity: 0.5,
    backgroundColor: COLORS.contain,
  },
  buttonText: {
    fontSize: ResponsiveSize(17),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ResponsiveSize(20),
  },
});

export default UserDetails;
