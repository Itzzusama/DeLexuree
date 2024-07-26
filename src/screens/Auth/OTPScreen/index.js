import {StyleSheet} from 'react-native';
import React, {useState} from 'react';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomButton from '../../../components/CustomButton';
import AuthWrapper from '../../../components/AuthWrapper';
import OTPComponent from '../../../components/OTP';
import {post} from '../../../Services/ApiRequest';
import {ToastMessage} from '../../../utils/ToastMessage';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../../store/reducer/AuthConfig';
import {setUserData} from '../../../store/reducer/usersSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isAccountCreated = route?.params?.isAccountCreated;
  const bodySignUp = route?.params?.bodySignUp;
  const location = route?.params?.location;
  const token = route?.params?.token;
  const extraData = route?.params?.extraData;
  const dob = route?.params?.dob;
  const DBS = route?.params?.DBS;
  const {userCategory} = useSelector(state => state.authConfigs);

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const body = {
        code: otp,
        token: token,
      };
      // const url =
      //   from === 'forgot' ? 'users/forget-password' : 'users/send-code';
      const response = await post('users/verify-otp/forget-password', body);
      console.log('this is respppppp'), response.data;
      if (response.data.success) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'ResetPass',
              params: {
                token: token,
              },
            },
          ],
        });
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

  const handleCheckOtp = async () => {
    setLoading(true);
    try {
      const body = {
        phone: bodySignUp?.phone,
        code: otp,
      };
      const response = await post('users/verify-otp/registration', body);
      console.log('res----', response.data);
      if (response.data.success) {
        handleRegisterUser();
        // ToastMessage(response.data?.message);
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

  const handleRegisterUser = async () => {
    setLoading(true);
    try {
      const body = {
        email: bodySignUp?.email,
        phone: bodySignUp?.phone,
        password: bodySignUp?.password,
        fcmtoken: '',
        fname: bodySignUp?.fName,
        lname: bodySignUp?.lName,
        location: {
          lat: '12312312',
          lng: '1231231',
          address: location,
        },
        title: extraData?.title,
        doc_url: '',
        exp: extraData?.exp,
        dbs: DBS,
        dob: dob,
        category: userCategory == 'Shoe Cleaning' ? 'shoeclean' : userCategory,
      };
      const response = await post('users/signup/shop', body);
      await AsyncStorage.setItem('token', response.data?.token);
      dispatch(setToken(response.data?.token));
      dispatch(setUserData(response.data?.user));
      if (response.data?.user?.category == 'accomodation') {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Accommodation',
              params: {
                isSkip: true,
              },
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Success', params: {isAccountCreated: true}}],
        });
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      footerUnScrollable={() => (
        <CustomButton
          title={isAccountCreated ? 'Done' : 'Continue'}
          marginTop={40}
          width="90%"
          marginBottom={30}
          loading={loading}
          // onPress={
          //   isAccountCreated
          //     ? () => navigation.navigate('Success', {isAccountCreated})
          //     : () => navigation.navigate('ResetPass')
          // }
          onPress={isAccountCreated ? handleVerifyOtp : handleCheckOtp}
        />
      )}>
      <AuthWrapper heading="OTP" desc="OTPDesc">
        <OTPComponent value={otp} setValue={setOtp} />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({});
