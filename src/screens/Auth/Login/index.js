import {StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomButton from '../../../components/CustomButton';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';

import fonts from '../../../assets/fonts';
import {passwordRegex, regEmail} from '../../../utils/constants';
import {ToastMessage} from '../../../utils/ToastMessage';
import {post} from '../../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../../store/reducer/usersSlice';
import {setToken} from '../../../store/reducer/AuthConfig';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {userCategory} = useSelector(state => state.authConfigs);

  const init = {
    email: '',
    password: '',
  };
  const inits = {
    emailError: '',
    passwordError: '',
  };
  const [errors, setErrors] = useState(inits);
  const [state, setState] = useState(init);
  const array = [
    {
      id: 1,
      placeholder: 'Email',
      value: state.email,
      onChange: text => setState({...state, email: text}),
      error: errors?.emailError,
    },

    {
      id: 2,
      placeholder: 'Password',
      value: state.password,
      onChange: text => setState({...state, password: text}),
      error: errors?.passwordError,
    },
  ];
  const handleLogin = async () => {
    try {
      setLoading(true);
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      const body = {
        email: state.email,
        password: state.password,
        fcmtoken: fcmToken,
      };
      const response = await post('auth/', body);

      console.log('res-------', response.data);
      if (response.data?.success) {
        await AsyncStorage.setItem('token', response.data?.token);
        dispatch(setToken(response.data?.token));
        dispatch(setUserData(response.data?.user));
        // if (response.data?.category == 'accomodation') {
        //   navigation.reset({
        //     index: 0,
        //     routes: [
        //       {
        //         name: 'Accommodation',
        //       },
        //     ],
        //   });
        // } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainStack',
            },
          ],
        });
      }
      // }
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.email) newErrors.emailError = 'Please enter Email address';
      else if (!regEmail.test(state.email))
        newErrors.emailError = 'Please enter valid email';
      else if (!state.password)
        newErrors.passwordError = 'Please enter Password';
      else if (!passwordRegex.test(state.password))
        newErrors.passwordError =
          'Password must contain 1 number, 1 special character, Uppercase and 8 digits';
      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);
  return (
    <ScreenWrapper scrollEnabled>
      <AuthWrapper heading="Login" desc="signUpDesc">
        {array.map(item => (
          <CustomInput
            key={item?.id}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            error={item.error}
            secureTextEntry={item.id === 2}
          />
        ))}

        <CustomText
          label="Forgot Password"
          fontSize={16}
          fontFamily={fonts.semiBold}
          alignSelf="flex-end"
          onPress={() => navigation.navigate('ForgetPass')}
        />
        <CustomButton
          title="Login"
          marginTop={40}
          onPress={handleLogin}
          loading={loading}
          disabled={
            loading || !Object.values(errors).every(error => error === '')
          }
        />
        <CustomText
          label="I don’t have an account"
          fontSize={16}
          fontFamily={fonts.semiBold}
          alignSelf="center"
          marginTop={20}
          onPress={() => navigation.navigate('Category')}
        />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({});
