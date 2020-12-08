import AddWishScreen from '../screens/AddWishScreen';
import AddWishlistScreen from '../screens/AddWishlistScreen';
import EditUserInfo from '../screens/EditUserInfo';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import React from 'react';
import WishlistInfoScreen from '../screens/WishlistInfoScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

export default MainStackScreens = () => {
  const MainStack = createBottomTabNavigator();
  const WishlistStack = createStackNavigator();
  const ProfileStack = createStackNavigator();
  const tabBarOptions = {
    showLabel: false,
    keyboardHidesTabBar: true,
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = 'ios-home';

      switch (route.name) {
        case 'Wishlist':
          iconName = 'ios-list';
          break;

        case 'Profile':
          iconName = 'ios-contact';
          break;

        default:
          iconName = 'ios-list';
      }

      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? '#000000' : '#5c5c5c'}
        />
      );
    },
  });

  return (
    <MainStack.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
      initialRouteName='Profile'
    >
      <MainStack.Screen name='Wishlist'>
        {() => (
          <WishlistStack.Navigator>
            <WishlistStack.Screen
              name='MyWishlists'
              component={WishlistScreen}
              options={{
                headerShown: false,
                title: 'Wishlists',
              }}
            />
            <WishlistStack.Screen
              name='AddWishlist'
              component={AddWishlistScreen}
              options={{ title: 'Create new wishlist' }}
            />
            <WishlistStack.Screen
              name='AddWish'
              component={AddWishScreen}
              options={{ title: 'Create new wish' }}
            />
            <WishlistStack.Screen
              name='WishListInfo'
              component={WishlistInfoScreen}
              options={{ title: 'Details' }}
            />
          </WishlistStack.Navigator>
        )}
      </MainStack.Screen>
      <MainStack.Screen name='Profile'>
        {() => (
          <ProfileStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName='Profile'
          >
            <ProfileStack.Screen name='Profile' component={ProfileScreen} />
            <ProfileStack.Screen name='EditUser' component={EditUserInfo} />
          </ProfileStack.Navigator>
        )}
      </MainStack.Screen>
    </MainStack.Navigator>
  );
};
