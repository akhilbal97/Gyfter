import React, { createContext, useState } from 'react';

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    uid: '',
    isLoggedIn: null,
    profilePhotoUrl: '',
    UserFirstName: '',
    UserLastName: '',
    bio: '',
    location: '',
    locationCode: '',
    birthday: '',
    wishlists: [],
    wishes: [],
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
