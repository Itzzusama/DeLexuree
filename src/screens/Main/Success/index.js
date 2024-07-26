import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import ImageFast from '../../../components/ImageFast';
import {Images} from '../../../assets/images';
import {COLORS} from '../../../utils/COLORS';
import CustomText from '../../../components/CustomText';
import fonts from '../../../assets/fonts';
import CustomButton from '../../../components/CustomButton';

const Success = ({navigation, route}) => {
  const isAccountCreated = route?.params?.isAccountCreated;
  return (
    <ScreenWrapper
      backgroundColor={COLORS.primaryColor}
      statusBarColor={COLORS.primaryColor}
      barStyle="light-style">
      <View style={styles.mainContainer}>
        <ImageFast
          source={isAccountCreated ? Images.accountCreated : Images.otpSent}
          style={styles.image}
          resizeMode="contain"
        />
        <CustomText
          label={isAccountCreated ? 'signUpSuccess' : 'Open your email'}
          color={COLORS.white}
          fontFamily={fonts.boldExtra}
          fontSize={28}
          textAlign="center"
        />
        <CustomText
          label={isAccountCreated ? 'signUpSuccessDecs' : 'sendOtp'}
          color={COLORS.gray1}
          fontSize={16}
          textAlign="center"
          marginTop={30}
        />
        <View style={{flex: 1}} />
        {isAccountCreated ? null : (
          <CustomText
            label="Open Email App"
            fontSize={18}
            fontFamily={fonts.semiBold}
            alignSelf="center"
            color={COLORS.white}
            marginBottom={30}
            onPress={() => {}}
          />
        )}

        <CustomButton
          title={isAccountCreated ? 'Get Started' : 'Continue'}
          backgroundColor={COLORS.primaryColor1}
          marginBottom={40}
          onPress={() =>
            navigation.navigate(isAccountCreated ? 'Login' : 'OTPScreen')
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default Success;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 124,
    height: 124,
    marginTop: 100,
    marginBottom: 50,
  },
});
