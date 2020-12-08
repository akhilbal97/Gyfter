import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export default AuthStackScreens = () => {
    const AuthStack = createStackNavigator();

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}/>
        </AuthStack.Navigator>
    );
}