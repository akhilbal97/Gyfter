import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default AddWishlist = ({ navigation }) => {
  // user info
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const [listName, setListName] = useState('');
  const [listDesc, setListDesc] = useState('');

  const addWishlist = async () => {
    try {
      const uid = user.uid;

      const added_wishlist = await firebase.createWishlist({
        listDesc,
        listName,
        uid,
      });

      setUser((state) => {
        return { ...state, wishlists: [...state.wishlists, added_wishlist] };
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('MyWishlists');
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <Text large bold>
          Create new wishlist
        </Text>
      </HeaderContainer>

      <List>
        <ListContainer>
          <Title>List Name</Title>
          <ListField
            onChangeText={(listName) => setListName(listName)}
            value={listName}
          ></ListField>
        </ListContainer>

        <ListContainer>
          <Title>List Description</Title>
          <ListField
            onChangeText={(listDesc) => setListDesc(listDesc)}
            value={listDesc}
          ></ListField>
          <Create onPress={addWishlist}>
            <Text>Create</Text>
          </Create>
        </ListContainer>
      </List>
    </Container>
  );
};

const Create = styled.TouchableOpacity`
  margin: 0 32px;
  top: 35px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #ff708d;
  border-radius: 20px;
`;

const Container = styled.View`
  flex: 1;
  padding-left: 32px;
`;

const HeaderContainer = styled.View`
  margin-top: 35px;
`;

const List = styled.View`
  margin: 0px 32px 32px;
`;

const ListContainer = styled.View`
  margin-bottom: 32px;
  right: 5%;
`;

const ListField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 1px;
  height: 48px;
  font-size: 16px;
`;

const Title = styled(Text)`
  color: #000000;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 300;
  margin-top: 60px;
`;
