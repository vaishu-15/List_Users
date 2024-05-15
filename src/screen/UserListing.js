import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteUser, list, fetchDataWithDelay} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';
import { COLORS } from '../utils/constants';

const UserListing = ({navigation}) => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const listData = useSelector(state => state?.user);

  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(fetchDataWithDelay())
  //     .then(() => {
  //       setIsLoading(false);
  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    dispatch(list());
  }, [list]);

  const handleUserPress = userId => {
    navigation.navigate('UserListingDetails', {userId});
  };

  const handleDeleteUser = userId => {
    dispatch(deleteUser(userId));
  };

  return (
    <View style={styles.container}>
      {/* {isLoading ? (
        <ActivityIndicator
          style={{marginTop: '80%'}}
          size="large"
          color="#0000ff"
        />
      ) : ( */}
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>List of users</Text>
        <FlatList
          data={listData}
          renderItem={({item}) => (
            <View style={styles.list}>
              <TouchableOpacity onPress={() => handleUserPress(item.id)}>
                <Image source={{uri: item.avatar}} style={styles.profile} />
              </TouchableOpacity>
              <View style={styles.detailContainer}>
                <Text style={styles.name}>
                  {item.first_name} {item.last_name}
                </Text>
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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Users')}>
          <Text style={styles.btnText}>Continue to Next page</Text>
        </TouchableOpacity>
      </View>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
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
    flex: 1,
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
});

export default UserListing;
