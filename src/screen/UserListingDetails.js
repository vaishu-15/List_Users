import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserDetails} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';
import {COLORS} from '../utils/constants';

const UserListingDetails = ({route, navigation}) => {
  const {userId} = route.params;
  const dispatch = useDispatch();
  const userDetails = useSelector(state =>
    state?.user?.find(user => user.id === userId),
  );

  useEffect(() => {
    dispatch(fetchUserDetails(userId));
  }, [dispatch, userId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack('')}
        style={styles.backButtonContainer}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      {userDetails && (
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>
              {userDetails.first_name} {userDetails.last_name}
            </Text>
            <Text style={styles.emailText}>{userDetails.email}</Text>
            <TouchableOpacity>
              <Image source={{uri: userDetails.avatar}} style={styles.avatar} />
            </TouchableOpacity>
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
});

export default UserListingDetails;
