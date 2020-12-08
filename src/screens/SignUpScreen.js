import React, { useContext, useState } from 'react';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signUp = async () => {
    setLoading(true);

    const user = {
      username,
      email,
      password,
      profilePhotoUrl: 'default',
      userFirstName: 'FirstN',
      userLastName: 'LastN',
      bio: 'Write something about yourself!',
      location: 'Canada',
      locationCode: 'CA',
      birthday: 'April 20, 1969',
      wishlists: [],
      wishes: [],
    };

    try {
      const createdUser = await firebase.createUser(user);
      if (createdUser) {
        setUser({ ...createdUser, isLoggedIn: true });
      }
    } catch (error) {
      console.log('Error @signUp: ', error);
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
          Sign up to get started{' '}
        </Text>
      </Main>

      <Auth>
        <AuthContainer>
          <AuthTitle>Username</AuthTitle>
          <AuthField
            autoCapitalize='none'
            autoCompleteType='email'
            autoCorrect={false}
            onChangeText={(username) => setUsername(username.trim())}
            value={username}
          />
        </AuthContainer>
        <AuthContainer>
          <AuthTitle>Email Address</AuthTitle>
          <AuthField
            autoCapitalize='none'
            autoCompleteType='email'
            autoCorrect={false}
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

      <SignUpContainer onPress={signUp} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center medium>
            Sign Up
          </Text>
        )}
      </SignUpContainer>

      <SignIn onPress={() => navigation.navigate('SignIn')}>
        <Text small center>
          Already have an account?
          <Text bold color='#8B5FBF'>
            {' '}
            Sign In
          </Text>
        </Text>
      </SignIn>
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

const SignUpContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #ff708d;
  border-radius: 20px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: '#ffffff',
  size: 'small',
}))``;

const SignIn = styled.TouchableOpacity`
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
