import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import AgendamentoScreen from './screens/AgendamentoScreen';
import ProprietarioScreen from './screens/ProprietarioScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Login') iconName = 'login';
              else if (route.name === 'Cadastro') iconName = 'person-add';
              else if (route.name === 'Agendar') iconName = 'event';
              else if (route.name === 'Proprietário') iconName = 'list';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Cadastro" component={CadastroScreen} />
          <Tab.Screen name="Agendar" component={AgendamentoScreen} />
          <Tab.Screen name="Proprietário" component={ProprietarioScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

