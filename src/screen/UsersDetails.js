import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDetails} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';

const UserDetails = ({route, navigation}) => {
  const {userIdDetails} = route.params;
  const dispatch = useDispatch();
  const userDetail = useSelector(state =>
    state?.additionalData?.find(user => user.id === userIdDetails),
  );
  //   console.log('userdetails in screen', userDetail);

  useEffect(() => {
    dispatch(fetchDetails(userIdDetails));
  }, [dispatch, userIdDetails]);

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

export default UserDetails;
