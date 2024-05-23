import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../screen/Welcome';
import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import UserListing from '../screen/UserListing';
import Users from '../screen/Users';
import UserListingDetails from '../screen/UserListingDetails';
import UserDetails from '../screen/UsersDetails';
import Document from '../screen/Document';

const Stack = createNativeStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserListing"
        component={UserListing}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Users"
        component={Users}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserListingDetails"
        component={UserListingDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserDetails"
        component={UserDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Document"
        component={Document}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
