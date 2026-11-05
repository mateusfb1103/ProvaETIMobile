import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ComputadorListScreen from '../screens/ComputadorListScreen';
import ComputadorFormScreen from '../screens/ComputadorFormScreen';
import PerifericoListScreen from '../screens/PerifericoListScreen';
import PerifericoFormScreen from '../screens/PerifericoFormScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ComputadorList">
        <Stack.Screen 
          name="ComputadorList" 
          component={ComputadorListScreen} 
          options={{ title: 'Lista de Computadores' }} 
        />
        <Stack.Screen 
          name="ComputadorForm" 
          component={ComputadorFormScreen} 
          options={{ title: 'Formulário de Computador' }} 
        />
        <Stack.Screen
          name="PerifericoList"
          component={PerifericoListScreen}
          options={{ title: 'Lista de Periféricos' }} 
        />
        <Stack.Screen
          name="PerifericoForm"
          component={PerifericoFormScreen}
          options={{ title: 'Formulário de Periférico' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;