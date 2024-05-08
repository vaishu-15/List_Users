import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "../screen/Welcome";

const Stack = createNativeStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
