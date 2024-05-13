import React, {useEffect} from 'react';
import {View, FlatList,Text,StyleSheet, TouchableOpacity,Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {list,deleteUser} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';

const UserListing = ({navigation}) => {
  const dispatch = useDispatch();

  const listData = useSelector(state => state?.user);
  
  console.log('list data updated',listData)

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
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>List of users</Text>
        <FlatList
          data={listData}
          renderItem={({item}) => (
            <View style={styles.list}>
              <Text>Email: {item.email}</Text>
              <Text>firstName: {item.first_name}</Text>
              <Text>lastName: {item.last_name}</Text>
              <TouchableOpacity onPress={() => handleUserPress(item.id)}>
                <Image
                  source={{uri: item.avatar}}
                  style={{
                    width: ResponsiveSize(80),
                    height: ResponsiveSize(80),
                    borderRadius: ResponsiveSize(40),
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                <Text>Delete</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: ResponsiveSize(10),
    borderWidth: 1,
    margin: ResponsiveSize(15),
    borderRadius: ResponsiveSize(20),
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9E8C9',
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
    backgroundColor: '#503C3C',
    padding: ResponsiveSize(20),
    margin: ResponsiveSize(20),
    borderRadius: ResponsiveSize(10),
    marginBottom: '5%',
  },
  btnText: {
    fontSize: ResponsiveSize(20),
    color: '#F5E8C7',
    textAlign:'center'
  },
});

export default UserListing;