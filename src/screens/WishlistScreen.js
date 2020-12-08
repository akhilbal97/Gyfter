import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default WishlistScreen = ({ navigation }) => {
  // get data
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  //model visible
  const [toEdit, setToEdit] = useState({});
  const { wishlists } = user;

  //Edit wishlist
  const [modalVisible, setModalVisible] = useState(false);

  // Edit Fields
  const [wName, setWName] = useState('');
  const [wDescription, setWDescription] = useState('');

  var List = () => <Feed data={wishlists} renderItem={renderList} />;

  useEffect(() => {
    List = () => <Feed data={wishlists} renderItem={renderList} />;
  }, [wishlists]);

  const removeWishlist = async (id) => {
    try {
      await firebase.deleteWishlist(id);

      setUser((state) => {
        return {
          ...state,
          wishlists: [...state.wishlists.filter((w) => w.id != id)],
        };
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('MyWishlists');
    }
  };

  const updateWishlist = async () => {
    const date = new Date();
    try {
      // Pass data LName, DName, update Date
      await firebase.updateWishlist({
        listName: wName,
        listDesc: wDescription,
        lastEdited: date,
        id: toEdit.id,
      });

      // Pass object from firebase to update value
      setUser((state) => {
        return {
          ...state,
          wishlists: [
            ...state.wishlists.filter((w) => w.id != toEdit.id),
            {
              ...toEdit,
              listName: wName,
              listDesc: wDescription,
              lastEdited: date,
            },
          ],
        };
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('MyWishlists');
    }
  };

  const renderList = ({ item }) => {
    return (
      <ListContainer
        style={modalVisible ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {}}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WishListInfo', { id: item.id, listName: item.listName })}
        >
          <ListHeaderContainer>
            <ListInfoContainer>
              <Text bold medium2>
                {item.listName}
              </Text>
              <Text>{item.listDesc}</Text>
            </ListInfoContainer>
          </ListHeaderContainer>
        </TouchableOpacity>
        <EditButton
          onPress={() => {
            setWName(item.listName);
            setWDescription(item.listDesc);
            setToEdit(item);
            setModalVisible(true);
          }}
        >
          <Feather name='edit' size={24} color='black' />
        </EditButton>
        <DeleteButton
          onPress={() => {
            removeWishlist(item.id);
          }}
        >
          <MaterialIcons name='delete' size={27} color='black' />
        </DeleteButton>
      </ListContainer>
    );
  };

  return (
    <>
      {/* Edit Single Wishlist Data */}
      <View>
        <Modal animationType='fade' transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <EditContainer>
              <Text medium bold>
                Title:{' '}
              </Text>
              <WishlistName
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(wName) => setWName(wName)}
                value={wName}
              />
            </EditContainer>

            <EditContainer>
              <Text medium bold>
                Description:{' '}
              </Text>
              <WishlistDetail
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(wDescription) => setWDescription(wDescription)}
                value={wDescription}
              />
            </EditContainer>

            <SaveBtn
              style={styles.openButton}
              onPress={() => {
                // TODO: update database
                // TODO: update wishlist from firestore
                updateWishlist();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </SaveBtn>

            <CloseBtn
              style={styles.openButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </CloseBtn>
          </View>
        </Modal>
      </View>

      {/* Display wishlists */}
      <View
        style={
          modalVisible
            ? { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }
            : { flex: 1 }
        }
      >
        <HeaderContainer>
          <Text bold large>
            My Wishlists
          </Text>
       

        <AddWishlist
          style={modalVisible ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {}}
          onPress={() => {
            navigation.navigate('AddWishlist');
          }}
        >
          <PlusText>+</PlusText>
        </AddWishlist>
        </HeaderContainer>
        <FeedContainer>
          <List />
        </FeedContainer>
      </View>
    </>
  );
};

const SaveBtn = styled.TouchableOpacity``;
const CloseBtn = styled.TouchableOpacity``;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    left: 8,
    top: -9,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 160,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 100,
  },
  openButton: {
    backgroundColor: '#ff708d',
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
    padding: 10,
    // elevation: 2,
    margin: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const WishlistName = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const EditContainer = styled.View`
  margin-bottom: 32px;
`;
const WishlistDetail = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const EditButton = styled.TouchableOpacity`
  position: absolute;
  left: 73%;
  top: 13px;
  padding-bottom: 15px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  left: 87%;
  top: 13px;
  padding-bottom: 15px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;

const HeaderContainer = styled.View`
  margin: 75px 20px 10px 10px;
  left: 2%;
  bottom: 20px;
`;

const FeedContainer = styled.View`
  height: 79%;
  top: 90px;
  bottom: 20px;
  width: 100%;
  position: absolute;
`;

const AddWishlist = styled.TouchableOpacity`
  position: absolute;
  width: 100px;
  height: 34px;

  top: 9%;
  bottom: 20px;
  left: 75%;

  background: #ff708d;
  border-radius: 26px;
`;

const Feed = styled.FlatList`
  top: 35px;
`;

const ListContainer = styled.View`
  margin: 16px 16px 0 16px;
  background-color: #dcd6f7;
  border-radius: 6px;
  padding: 8px;
`;

const ListHeaderContainer = styled.View``;

const ListInfoContainer = styled.View`
  flex: 1;
  margin: 0 16px;
  top: 10px;
  width: 60%;
`;
