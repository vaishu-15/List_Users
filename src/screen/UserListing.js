import React, {useEffect} from 'react';
import {View, FlatList,Text,StyleSheet, TouchableOpacity,Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { list } from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';

const UserListing = ({navigation}) => {
  const dispatch = useDispatch();

  const listData = useSelector(state => state?.user?.data);
  console.log('listing data',listData);

  useEffect(() => {
    dispatch(list());
  }, [list]);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listHeading}>List of users</Text>
        <FlatList
          data={listData}
          renderItem={({item}) => (
            <View style={styles.list}>
                <Text>Name: {item.name}</Text>
                <Text>Year: {item.year}</Text>
                <Text>Color: {item.color}</Text>
                <Text>Pantone Value: {item.pantone_value}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Users')}>
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

{
  /* <Image
          source={require('../../assets/images/listEdit.jpg')}
          style={styles.image}
          resizeMode="cover"
        /> */
}