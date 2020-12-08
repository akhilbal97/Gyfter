import { Button, Checkbox, TextInput } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';

export default AddWish = ({ route, navigation }) => {
  const { wishlistId, editOption, obj } = route.params;
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useContext(UserContext);

  const [wishTitle, setWishTitle] = useState(
    editOption == 'create' ? '' : obj.title
  );
  const [wishContext, setWishContext] = useState(
    editOption == 'create' ? '' : obj.context
  );
  const [completed, setCompleted] = useState(
    editOption == 'create' ? false : obj.completed
  );

  const addWish = async () => {
    try {
      const added_wish = await firebase.createWish({
        title: wishTitle,
        context: wishContext,
        completed: completed,
        uid: user.uid,
        wishlistId: wishlistId,
      });

      setUser((state) => {
        console.log(added_wish);
        return { ...state, wishes: [...state.wishes, added_wish] };
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('WishListInfo', { id: wishlistId });
    }
  };

  const updateWish = async () => {
    const date = Date.now();
    const save_wish = {
      wishId: obj.wishId,
      title: wishTitle,
      context: wishContext,
      completed: completed,
      uid: user.uid,
      wishlistId: wishlistId,
      lastEdited: date.toString(),
    };
    try {
      await firebase.updateWishes(save_wish);

      setUser((state) => {
        return {
          ...state,
          wishes: [
            ...state.wishes.filter((w) => w.wishId != obj.wishId),
            save_wish,
          ],
        };
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('WishListInfo', { id: wishlistId });
    }
  };

  return (
    <>
      <TextInput
        label='Title'
        mode='outlined'
        style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
        value={wishTitle}
        onChangeText={(text) => setWishTitle(text)}
      />
      <TextInput
        label='Context'
        mode='outlined'
        style={{ margin: 20, maxHeight: 150 }}
        multiline
        dense
        value={wishContext}
        onChangeText={(text) => setWishContext(text)}
        numberOfLines={10}
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 20,
          marginBottom: 20,
          alignItems: 'center',
        }}
      >
        <Text>Completed: </Text>
        <Checkbox
          status={completed ? 'checked' : 'unchecked'}
          color='purple'
          onPress={() => {
            setCompleted(!completed);
          }}
        />
      </View>
      <Button
        style={{
          marginLeft: 80,
          marginRight: 80,
          marginTop: 155,
          borderRadius: 15,
        }}
        mode='contained'
        onPress={() => {
          {
            editOption == 'create' ? addWish() : updateWish();
          }
        }}
      >
        {editOption == 'create' ? 'Create' : 'Update'}
      </Button>
    </>
  );
};
