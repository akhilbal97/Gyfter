import React, { useContext } from "react"
import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreens from "./MainStackScreens";
import AuthStackScreens from "./AuthStackScreen";
import { UserContext } from "../context/UserContext"
// import LoadingScreen from "../screens/LoadingScreen";


export default AppStackScreens = () => {
    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext);

    return (
            <AppStack.Navigator  headerMode="none">
               {user.isLoggedIn ? (
                    <AppStack.Screen name="Main" component={MainStackScreens} />
                ) : (
                <AppStack.Screen name="Auth" component={AuthStackScreens} />
                )}
            </AppStack.Navigator>
        
    );
};

