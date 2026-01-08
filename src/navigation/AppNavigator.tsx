import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EditSubscriptionScreen } from '../screens/EditSubscriptionScreen';

export type RootStackParamList = {
  EditSubscription: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EditSubscription"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen 
          name="EditSubscription" 
          component={EditSubscriptionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

