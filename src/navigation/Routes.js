import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "../screen/Welcome";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import UserListing from "../screen/UserListing";

const Stack = createNativeStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />
       <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
       <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserListing"
        component={UserListing}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
