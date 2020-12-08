import React, { useContext, useState } from 'react';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signIn = async () => {
    setLoading(true);

    try {
      await firebase.signIn(email, password);

      const uid = firebase.getCurrentUser().uid;

      const userInfo = await firebase.getUserInfo(uid);

      const wLists = await firebase.getWishlists(uid);

      const wiShes = await firebase.getAllWishes(uid);

      setUser({
        username: userInfo.username,
        email: userInfo.email,
        uid,
        isLoggedIn: true,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        userFirstName: userInfo.userFirstName,
        userLastName: userInfo.userLastName,
        bio: userInfo.bio,
        location: userInfo.location,
        birthday: userInfo.birthday,
        locationCode: userInfo.locationCode,
        wishlists: wLists,
        wishes: wiShes,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderGraphic>
        <LeftCircle />
        <RightCircle />
      </HeaderGraphic>
      <Main>
        <Text title bold center>
          {' '}
          G Y F T E R
        </Text>
      </Main>

      <Auth>
        <AuthContainer>
          <AuthTitle>Email Address</AuthTitle>
          <AuthField
            autoCapitalize='none'
            autoCompleteType='email'
            autoCorrect={false}
            autoFocus={true}
            keyboardType='email-address'
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle>Password</AuthTitle>
          <AuthField
            autoCapitalize='none'
            autoCompleteType='password'
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password.trim())}
            value={password}
          />
        </AuthContainer>
      </Auth>

      <SignInContainer onPress={signIn} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center medium>
            Sign In
          </Text>
        )}
      </SignInContainer>

      <SignUp onPress={() => navigation.navigate('SignUp')}>
        <Text small center>
          New to Gyfter?
          <Text bold color='#8B5FBF'>
            {' '}
            Sign Up
          </Text>
        </Text>
      </SignUp>

      <PasswordReset onPress={() => navigation.navigate('ForgotPassword')}>
        <Text small center bold color='#8B5FBF'>
          Forgot Password?
        </Text>
      </PasswordReset>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #dcd6f7;
`;

const Main = styled.View`
  margin-top: 192px;
`;

const Auth = styled.View`
  margin: 64px 32px 32px;
`;

const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const AuthTitle = styled(Text)`
  color: #000000;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 300;
`;

const SignInContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #ff708d;
  border-radius: 20px;
`;

const GoogleAuth = styled.TouchableOpacity`
  margin: 16px 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #4285f4;
  border-radius: 20px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: '#ffffff',
  size: 'small',
}))``;

const SignUp = styled.TouchableOpacity`
  margin-top: 16px;
`;

const PasswordReset = styled.TouchableOpacity`
  margin-top: 16px;
`;
const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
`;

const RightCircle = styled.View`
  position: absolute;
  width: 323px;
  height: 311px;
  border-radius: 300px;
  left: 217px;
  top: -154px;
  background-color: #8b5fbf;
`;
const LeftCircle = styled.View`
  position: absolute;
  border-radius: 300px;
  width: 575px;
  height: 500px;
  left: -303px;
  top: -200px;
  background-color: #ff708d;
`;
