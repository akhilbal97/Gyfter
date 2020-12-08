import React, { useContext, useState } from 'react';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import styled from 'styled-components';

export default SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
 
  const firebase = useContext(FirebaseContext);


  const resetPassword = async () => {
    try {
      await firebase.passwordReset(email);
    } catch (error) {
      alert(error.message);
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
        Reset Password
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
      </Auth>

      <Button onPress={resetPassword}>
          <Text bold center medium>
            Send recovery email
          </Text>
      </Button>

      <Cancel onPress={() => navigation.navigate('SignIn')}>
          <Text bold center medium color="#fff">
            Back
          </Text>
      </Cancel>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #dcd6f7;
`;

const Main = styled.View`
  margin-top: 300px;
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

const Button = styled.TouchableOpacity`
  margin: 16px 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #ff708d;
  border-radius: 20px;
`;

const Cancel = styled.TouchableOpacity`
  margin: 16px 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #8b5fbf;
  border-radius: 20px;
`;


const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: '#ffffff',
  size: 'small',
}))``;

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
