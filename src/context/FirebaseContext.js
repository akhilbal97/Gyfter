import 'firebase/auth';
import 'firebase/firestore';

import React, { createContext } from 'react';

import config from '../config/firebase';
import firebase from 'firebase';

const FirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },

  createUser: async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;

      await db.collection('users').doc(uid).set({
        username: user.username,
        email: user.email,
        profilePhotoUrl: user.profilePhotoUrl,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        bio: user.bio,
        location: user.location,
        locationCode: user.locationCode,
        birthday: user.birthday,
      });

      delete user.password;

      return { ...user, uid };
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  },

  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError('Network request failed.'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection('users').doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log('Error @getUserInfo: ', error);
    }
  },

  updateUserInfo: async (uid, user) => {
    try {
      await db.collection('users').doc(uid).update({
        bio: user.newBio,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        birthday: user.birth,
        location: user.countryName,
        locationCode: user.countryCode,
        profilePhotoUrl: user.profilePhoto,
        username: user.uname,
      });
    } catch (error) {
      console.log('Error @updateUserInfo: ', error);
    }
  },

  // get wishlists
  // pass uid - user id
  getWishlists: async (uid) => {
    try {
      var snapshot = await db
        .collection('wishlists')
        .where('uid', '==', uid)
        .get();

      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.log('Error @getWishlists: ', error);
    }
  },

  // get wishes of single wishlist
  getAllWishes: async (id) => {
    try {
      var snapshot = await db.collection('wishes').where('uid', '==', id).get();

      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.log('Error @getWishlists: ', error);
    }
  },

  // update wishlist data
  updateWishlist: async (wishlist) => {
    try {
      db.collection('wishlists').doc(wishlist.id).update({
        listDesc: wishlist.listDesc,
        listName: wishlist.listName,
        lastEdited: wishlist.lastEdited,
      });
    } catch (error) {
      console.log('Error @updateWishlistFailed: ', error);
    }
  },

  // update wishlist data
  updateWishes: async (wishes) => {
    try {
      db.collection('wishes').doc(wishes.wishId).update({
        completed: wishes.completed,
        context: wishes.context,
        title: wishes.title,
        lastEdited: wishes.lastEdited,
        title: wishes.title,
      });
    } catch (error) {
      console.log('Error @updateWishesFailed: ', error);
    }
  },

  // delete wishlsit

  deleteWishlist: async (id) => {
    try {
      const query = await db.collection('wishlists').where('id', '==', id);

      query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });

      const query2 = await db
        .collection('wishes')
        .where('wishlistId', '==', id);

      query2.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
    } catch (error) {
      console.log('Error @deleteWishlist: ', error);
    }
  },

  // delete wish

  deleteWish: async (id) => {
    try {
      const query = await db.collection('wishes').where('wishId', '==', id);

      query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
    } catch (error) {
      console.log('Error @deleteWish: ', error);
    }
  },

  // create wishlist
  createWishlist: async (wishlist) => {
    try {
      const date = new Date();

      var obj = {
        lastEdited: date.toString(),
        listDesc: wishlist.listDesc,
        listName: wishlist.listName,
        uid: wishlist.uid,
        id: '',
      };

      const { id } = await db.collection('wishlists').add(obj);

      await db.collection('wishlists').doc(id).update({ id: id });

      obj.id = id;

      return obj;
    } catch (error) {
      console.log('Error @addWishlist: ', error);
    }
  },

  // create wish
  createWish: async (wish) => {
    try {
      const date = new Date();

      var obj = {
        title: wish.title,
        context: wish.context,
        completed: wish.completed,
        uid: wish.uid,
        wishlistId: wish.wishlistId,
        lastEdited: date.toString(),
        wishId: '',
      };

      console.log(obj);

      const { id } = await db.collection('wishes').add(obj);

      await db.collection('wishes').doc(id).update({ wishId: id });

      obj.wishId = id;

      return obj;
    } catch (error) {
      console.log('Error @addWish: ', error);
    }
  },

  logOut: async () => {
    try {
      await firebase.auth().signOut();

      return true;
    } catch (error) {
      console.log('Error @logOut: ', error);
    }

    return false;
  },

  signIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  passwordReset: async (email) => {
    const emailExists = firebase.auth().fetchSignInMethodsForEmail(email);
    if (emailExists) {
      alert('A recovery link has been sent to your email.');
      return firebase.auth().sendPasswordResetEmail(email);
    }
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
