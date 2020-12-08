import React from 'react';

import AppStackScreens from "./src/routes/AppStackScreens"
import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from "./src/context/UserContext"
import { FirebaseProvider } from './src/context/FirebaseContext';

export default function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
          <NavigationContainer>
            <AppStackScreens/>  
          </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  );
}


