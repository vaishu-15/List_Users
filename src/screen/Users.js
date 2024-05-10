import React, {useEffect,useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteUser, listAdd,} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';

const Users = ({navigation}) => {
  const dispatch = useDispatch();

  const data = useSelector(state => state?.additionalData);
  console.log('data', data);

  useEffect(() => {
    dispatch(listAdd());
  }, [listAdd]);

//   const handleDeleteUser = userId => {
//     console.log('Deleting user with ID:', userId);
//     dispatch(deleteUser(userId));
//   };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Users</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <>
              <View style={styles.list}>
                <Text>Name: {item.name}</Text>
                <Text>Year: {item.year}</Text>
                <Text>Color: {item.color}</Text>
                <Text>Pantone Value: {item.pantone_value}</Text>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() => navigation.navigate('Create')}>
                  <Image
                    source={require('../../assets/images/edit.png')}
                    style={{
                      width: ResponsiveSize(25),
                      height: ResponsiveSize(25),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                  <Image
                    source={require('../../assets/images/remove.png')}
                    style={{
                      width: ResponsiveSize(40),
                      height: ResponsiveSize(40),
                    }}
                  />
                </TouchableOpacity>
              </View> */}
            </>
          )}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Go Back</Text>
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
    textAlign: 'center',
  },
});

export default Users;
