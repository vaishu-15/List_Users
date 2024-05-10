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
import {listAdd} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';

const Users = ({navigation}) => {
  const dispatch = useDispatch();

  const data = useSelector(state => state?.additionalData?.data);
  console.log('data', data);

  useEffect(() => {
    dispatch(listAdd());
  }, [listAdd]);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Users</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.list}>
              <View>
                <Text>Email: {item.email}</Text>
                <Text>firstName: {item.first_name}</Text>
                <Text>lastName: {item.last_name}</Text>
              </View>
              <Image
                source={{uri: item.avatar}}
                style={{
                  width: ResponsiveSize(80),
                  height: ResponsiveSize(80),
                  borderRadius: ResponsiveSize(40),
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                  <Image
                    source={require('../../assets/images/edit.png')}
                    style={{
                      width: ResponsiveSize(25),
                      height: ResponsiveSize(25),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/remove.png')}
                    style={{
                      width: ResponsiveSize(40),
                      height: ResponsiveSize(40),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
