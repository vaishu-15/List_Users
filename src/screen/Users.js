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
import {listAdd} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';

const Users = ({navigation}) => {
  const dispatch = useDispatch();

  const data = useSelector(state => state?.additionalData);

  useEffect(() => {
    dispatch(listAdd());
  }, [listAdd]);

  const handleUserPress = userIdDetails => {
    navigation.navigate('UserDetails', {userIdDetails});
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>Users</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <>
              <View style={styles.list}>
                <TouchableOpacity onPress={() => handleUserPress(item.id)}>
                  <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
                <View style={styles.details}>
                  <Text style={styles.year}>
                    {''}
                    {item.year}
                  </Text>
                  <Text style={styles.pantoneValue}>{item.pantone_value}</Text>
                </View>
                <Text style={styles.color}>{item.color}</Text>
              </View>
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
    flexDirection: 'column',
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
  name: {
    fontWeight: '600',
    fontSize: ResponsiveSize(25),
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  year: {
    fontSize: ResponsiveSize(20),
  },
  pantoneValue: {
    fontSize: ResponsiveSize(20),
  },
  color: {
    alignSelf: 'flex-end',
    fontSize: ResponsiveSize(18),
  },
});

export default Users;
