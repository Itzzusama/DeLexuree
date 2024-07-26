import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomButton from '../../../components/CustomButton';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';

import fonts from '../../../assets/fonts';

import {post} from '../../../Services/ApiRequest';
import {ToastMessage} from '../../../utils/ToastMessage';
import {COLORS} from '../../../utils/COLORS';
import Gallery from '../../../components/Gallery';
import {useSelector} from 'react-redux';
import {className} from '../../../global-styles';
const PreviousWork = ({navigation, route}) => {
  const user = route?.params?.user;
  const dob = route?.params?.dob;
  const location = route?.params?.location;
  const {userCategory} = useSelector(state => state.authConfigs);

  const init = {
    title: '',
    exp: '',
  };

  const inits = {
    titleError: '',
    expError: '',
  };

  const [state, setState] = useState(init);
  const [errors, setErrors] = useState(inits);
  const [loading, setLoading] = useState(false);
  const [user_type, setUser_type] = useState('Public');
  const [hasDBSCertificate, setHasDBSCertificate] = useState(false);

  const toggleDBSCertificate = () => {
    setHasDBSCertificate(!hasDBSCertificate);
  };

  const [imagesFromGallery, setImagesFromGallery] = useState([]);

  const handleImagesUpdate = images => {
    setImagesFromGallery(images);
  };

  const array = [
    {
      id: 1,
      placeholder: 'Title',
      value: state.fName,
      onChange: text => setState({...state, title: text}),
      error: errors.titleError,
    },
    {
      id: 2,
      placeholder: 'Experience',
      value: state.lName,
      onChange: text => setState({...state, exp: text}),
      error: errors.expError,
    },
  ];

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.title) newErrors.titleError = 'Please enter Title ';
      else if (!state.exp)
        newErrors.expError = 'Please enter previous Experience';
      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const body = {
        phone: user?.phone,
      };
      const response = await post('users/send-code', body);
      ToastMessage(response.data?.message);
      console.log('otp------------', response.data);
      if (response.data) {
        navigation.navigate('OTPScreen', {
          isAccountCreated: false,
          bodySignUp: user,
          location: location,
          extraData: state,
          DBS: hasDBSCertificate,
          dob: dob,
        });
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <>
          <CustomButton
            title="Create Account"
            width="90%"
            onPress={handleSendOtp}
            disabled={!Object.values(errors).every(error => error === '')}
            loading={loading}
          />
          <CustomText
            label="I already have an account"
            fontSize={16}
            fontFamily={fonts.semiBold}
            alignSelf="center"
            marginTop={20}
            marginBottom={30}
            onPress={() => navigation.navigate('Login')}
          />
        </>
      )}>
      <AuthWrapper
        heading="Previous Work "
        desc="signUpDesc"
        showStatus={true}
        index={1}>
        {array.map(item => (
          <CustomInput
            key={item?.id}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            error={item.error}
          />
        ))}

        <CustomText
          label="Do you drive or use public transport or personal?"
          fontSize={16}
          marginTop={12}
          fontFamily={fonts.semiBold}
        />

        <View style={className('flex-row justify-evenly py-4 ')}>
          {['Public', 1, 'Personal'].map((item, i) =>
            i == 1 ? (
              <Text
                style={className('text-20 text-semi text-white text-center ')}>
                Or
              </Text>
            ) : (
              <CustomButton
                width="28%"
                key={item}
                title={item}
                backgroundColor={
                  user_type == item ? COLORS.black : 'transparent'
                }
                color={user_type == item ? COLORS.white : 'black'}
                customStyle={{borderWidth: user_type == item ? 0 : 1}}
                onPress={() => setUser_type(item)}
              />
            ),
          )}
        </View>

        <TouchableOpacity
          onPress={toggleDBSCertificate}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.DBScontainer}>
            {hasDBSCertificate && (
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: COLORS.primaryColor,
                  borderRadius: 8,
                }}
              />
            )}
          </View>

          <CustomText
            label="Do you have a DBS certificate?"
            fontSize={16}
            fontFamily={fonts.semiBold}
          />
        </TouchableOpacity>

        <CustomText
          label={
            userCategory === 'accomodation'
              ? 'ID, Proof of Address, ownership documents or agreement with estate agent'
              : 'ID, Proof of Address, DBS (within last 6 months), Driving License (if you drive)'
          }
          fontSize={16}
          fontFamily={fonts.semiBold}
          marginTop={20}
        />

        <Gallery maxLength={4} onImagesUpdate={handleImagesUpdate} />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default PreviousWork;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  DBScontainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
