import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FirebaseContext } from '../context/FirebaseContext';
import Moment from 'moment';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import CustomText from "../components/Text"

export default EditUserInfo = ({ navigation }) => {
  // get data
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  // edit data
  const [newBio, setBio] = useState(user.bio);
  const [firstName, setFirstName] = useState(user.userFirstName);
  const [lastName, setLastName] = useState(user.userLastName);
  const [birth, setBirth] = useState(user.birthday);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhotoUrl);
  const [uname, setUName] = useState(user.username);

  // Country
  const [countryCode, setCountryCode] = useState(user.locationCode);
  const [countryName, setCountryName] = useState(user.location);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountryName(country.name);
  };

  // date time
  const [date, setDate] = useState(Date.parse(user.birthday));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setBirth(Moment(selectedDate).format('MMMM DD, YYYY'));
  };

  const updateData = async () => {
    try {
      await firebase.updateUserInfo(user.uid, {
        newBio,
        firstName,
        lastName,
        birth,
        countryCode,
        countryName,
        profilePhoto,
        uname,
      });

      // update user data
      setUser({
        ...user,
        bio: newBio,
        userFirstName: firstName,
        userLastName: lastName,
        birthday: birth,
        location: countryName,
        locationCode: countryCode,
        profilePhotoUrl: profilePhoto,
        username: uname,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('Profile');
    }
  };

  return (
    <>
      {/* First Name */}
      <FNameTitle>First Name: </FNameTitle>
      <FNameField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(firstN) => setFirstName(firstN.trim())}
        value={firstName}
      />

      {/* Last Name */}
      <LNameTitle>Last Name: </LNameTitle>
      <LNameField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(lastN) => setLastName(lastN.trim())}
        value={lastName}
      />

      {/* Birthday */}
      <BirthdayTitle>Birthday: </BirthdayTitle>
      <BirthdayField onPress={() => setShow(true)}>
        <Text>
          <AntDesign name='calendar' size={18} color='black' />
          {'  ' + birth}
        </Text>
      </BirthdayField>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode='date'
          is24Hour={false}
          display='default'
          onChange={onChange}
        />
      )}

      {/* Country */}
      <CountryTitle>Location: </CountryTitle>
      <LocationField>
        <CountryPicker
          {...{
            countryCode: countryCode,
            withCountryNameButton: true,
            withFilter: true,
            onSelect,
          }}
        />
      </LocationField>

      {/* PhotoURL */}
      <PhotoTitle>Photo URL: </PhotoTitle>
      <PhotoField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(pPhoto) => setProfilePhoto(pPhoto.trim())}
        value={profilePhoto}
      />

      {/* Bio */}
      <BioTitle>Bio: </BioTitle>
      <BioField
        autoCapitalize='none'
        autoCorrect={false}
        multiline
        numberOfLines={3}
        maxLength={100}
        onChangeText={(bio) => setBio(bio)}
        value={newBio}
      />

      {/*  */}
      <UNameTitle>Username: </UNameTitle>
      <UNameField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(uname) => setUName(uname)}
        value={uname}
      />

      <SaveUserData onPress={updateData}>
        <CustomText medium bold color="#000">Save User</CustomText>
      </SaveUserData>
    </>
  );
};

const FNameTitle = styled(Text)`
  position: absolute;
  width: 88px;
  height: 18px;
  left: 20px;
  top: 70px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const FNameField = styled.TextInput`
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 64px;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const LNameTitle = styled(Text)`
  position: absolute;
  width: 88px;
  height: 18px;
  left: 5%;
  top: 120px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const LNameField = styled.TextInput`
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 113px;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const BirthdayTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 5%;
  top: 170px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const BirthdayField = styled.TouchableOpacity`
  text-align: center;
  padding-left: 22%;
  padding-top: 4px;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 163px;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const CountryTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 5.5%;
  top: 219px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const LocationField = styled.View`
  text-align: center;
  padding-left: 22%;
  position: absolute;
  width: 67%;
  height: 30px;
  width: 67%;
  left: 27%;
  top: 213px;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const PhotoTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 7%;
  top: 270px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const PhotoField = styled.TextInput`
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 0.5%;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 263px;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const BioTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 6.5%;
  top: 320px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;

  color: #000000;
`;

const BioField = styled.TextInput`
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 8px;
  padding-bottom: 8px;
  position: absolute;
  width: 67%;
  left: 27%;
  top: 313px;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const UNameTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 5%;
  top: 413px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;

  color: #000000;
`;

const UNameField = styled.TextInput`
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 0.5%;
  position: absolute;
  width: 67%;
  left: 27%;
  top: 404px;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const SaveUserData = styled.TouchableOpacity`
  padding-left: 33px;
  padding-top: 17px;

  position: absolute;
  left: 33%;
  width: 33%;
  height: 55px;
  top: 627px;

  background: #ff708d;
  border-radius: 26px;
`;
