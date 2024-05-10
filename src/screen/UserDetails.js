import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserDetails} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';

const UserDetails = ({route}) => {
  const {userId} = route.params;
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user); 
  console.log('userdetails in screen',userDetails)

  useEffect(() => {
    dispatch(fetchUserDetails(userId));
  }, [dispatch, userId]);

  return (
    <View>
      {userDetails && (
        <View>
          <Text>
            Name: {userDetails.first_name} {userDetails.last_name}
          </Text>
          <Text>Email: {userDetails.email}</Text>
        </View>
      )}
    </View>
  );
}

export default UserDetails;
