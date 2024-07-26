import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../../../components/CustomHeader';
import ScreenWrapper from '../../../../components/ScreenWrapper';
import CustomText from '../../../../components/CustomText';
import {COLORS} from '../../../../utils/COLORS';
import {className} from '../../../../global-styles';
import CustomButton from '../../../../components/CustomButton';
import GooglePlaces from '../../../../components/GooglePlaces';
import CustomInput from '../../../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../../assets/images';
import ImageFast from '../../../../components/ImageFast';
import fonts from '../../../../assets/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {get, put} from '../../../../Services/ApiRequest';
import {ToastMessage} from '../../../../utils/ToastMessage';
import {setUserData} from '../../../../store/reducer/usersSlice';
import UploadImage from '../../../../components/UploadImage';

import {Image as ImageCompressor} from 'react-native-compressor';

import storage from '@react-native-firebase/storage';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.users);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(userData?.profilePicture);

  const init = {
    fName: userData?.fname,
    lName: userData?.lname,
    phone: userData?.phone,
    DoorNum: userData?.DoorNum,
  };

  const [state, setState] = useState(init);

  const [address, setAddress] = useState(userData?.location?.address);

  console.log('res======>', image);

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      const body = {
        fcmtoken: '',
        fname: state?.fName,
        lname: state?.lName,
        location: {
          lat: '12312312',
          lng: '1231231',
          address: address,
        },
        profilePicture: image,
        DoorNum: state?.DoorNum,
      };
      const response = await put('users/update-user', body);
      if (response.data.success) {
        getProfile();
        navigation.goBack();
      } else {
        ToastMessage(response.data?.message);
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const array = [
    {
      id: 1,
      placeholder: 'First Name',
      value: state.fName,
      onChange: text => setState({...state, fName: text}),
    },

    {
      id: 2,
      placeholder: 'Last Name',
      value: state.lName,
      onChange: text => setState({...state, lName: text}),
    },
    {
      id: 3,
      placeholder: 'Phone Number',
      value: state.phone,
      onChange: text => setState({...state, phone: text}),
    },
    {
      id: 6,
    },
    {
      id: 7,
      placeholder: 'Door Number',
      value: state.DoorNum,
      onChange: text => setState({...state, DoorNum: text}),
    },
  ];

  const uploadAndGetUrl = async file => {
    setImageLoading(true);
    try {
      const resizeUri = await ImageCompressor.compress(
        file.fileCopyUri || file.path,
      );
      const filename = `images/${new Date()
        .toISOString()
        .replace(/[.:-]+/g, '_')}`;
      const uploadUri =
        Platform.OS === 'ios' ? resizeUri.replace('file://', '') : resizeUri;
      const storageRef = storage().ref(filename);
      await storageRef.putFile(uploadUri);
      const url = await storageRef.getDownloadURL();
      ToastMessage('Image uploaded successfully');
      return url, setImage(url);
    } catch (err) {
      ToastMessage('Upload Again');
    } finally {
      setImageLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const response = await get('users/me');
      dispatch(setUserData(response.data?.user));
    } catch (error) {}
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.F8} paddingHorizontal={'0%'}>
      <View style={className('bg-white px-5 py-3')}>
        <CustomHeader lable={'Edit Profile'} />
      </View>
      {imageLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <UploadImage
          handleChange={async res => {
            const url = await uploadAndGetUrl(res);
            // setImage(url);
          }}
          renderButton={res => (
            <Pressable
              onPress={res}
              style={className('align-center justify-center mt-7')}>
              <ImageFast
                source={
                  userData?.profilePicture ? {uri: image} : Images.sampleProfile
                }
                style={{height: 90, width: 90, borderRadius: 50}}
              />
              <CustomText
                label={'Change Profile Picture'}
                fontSize={14}
                fontFamily={fonts.semiBold}
              />
            </Pressable>
          )}
        />
      )}

      <View style={className('px-5 pt-4 flex-1')}>
        {array.map(item =>
          item.id == 6 ? (
            <GooglePlaces
              key={item.id}
              value={address}
              setValue={setAddress}
              placeholder={item.placeholder}
            />
          ) : (
            <CustomInput
              key={item?.id}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={item.onChange}
              editable={item?.id == 3}
            />
          ),
        )}
      </View>
      <View style={className('px-5 mb-6')}>
        <CustomButton
          title="Save"
          loading={loading}
          onPress={handleUpdateUser}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
