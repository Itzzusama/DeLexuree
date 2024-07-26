import React, { useEffect, useMemo, useState } from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomButton from '../../../components/CustomButton';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';
import fonts from '../../../assets/fonts';
import { post } from '../../../Services/ApiRequest';
import { ToastMessage } from '../../../utils/ToastMessage';
import CountryPhoneInput from '../../../components/CountryPhoneInput';

const ForgetPass = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!phone)
        newErrors.phoneError = 'Please enter store phone number';
      else if (phone.length < 13)
        newErrors.phoneError = 'Phone number must be at least 8 digits';
      else
        newErrors.phoneError = ''; // Clear the error if no issues
      setPhoneError(newErrors);
    };
  }, [phone]);

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      const body = {
        phone: phone,
      };
      const response = await post('users/forget-password', body);
      console.log('res-------------', response.data);
      if (response.data?.success) {
        navigation.navigate('OTPScreen', {
          isAccountCreated: true,
          token: response.data?.token,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  return (
    <ScreenWrapper
      footerUnScrollable={() => (
        <>
          <CustomText
            label="Back to Login"
            fontSize={16}
            fontFamily={fonts.semiBold}
            alignSelf="center"
            marginTop={30}
            onPress={() => navigation.navigate('Login')}
          />
          <CustomButton
            title="Reset Password"
            marginTop={20}
            width="90%"
            marginBottom={30}
            loading={loading}
            onPress={handleSendOTP}
            disabled={!!phoneError.phoneError}
          />
        </>
      )}>
      <AuthWrapper heading="Forgot Password?" desc="forgotPassDesc">
        <CountryPhoneInput
          setValue={setPhone}
          value={phone}
          error={phoneError.phoneError}
        />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default ForgetPass;
