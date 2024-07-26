import {StyleSheet, Dimensions, View} from 'react-native';
import React from 'react';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import ImageFast from '../../../components/ImageFast';

import {Images} from '../../../assets/images';
import {COLORS} from '../../../utils/COLORS';
import fonts from '../../../assets/fonts';

const {width, height} = Dimensions.get('window');

const GetStarted = ({navigation}) => {
  return (
    <ScreenWrapper
      translucent
      statusBarColor="transparent"
      paddingHorizontal={0.1}>
      <View style={styles.imgContainer}>
        <ImageFast
          style={styles.img}
          source={Images.getStarted}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <CustomText
          label="getStartHeading"
          fontSize={27}
          marginBottom={15}
          textAlign="center"
          lineHeight={40}
          fontFamily={fonts.bold}
          color={COLORS.white}
        />
        <CustomText
          label="getStartDesc"
          color={COLORS.white}
          fontSize={20}
          marginBottom={30}
          textAlign="center"
          lineHeight={28}
          fontFamily={fonts.medium}
        />
        <CustomButton
          backgroundColor={COLORS.white}
          color={COLORS.primaryColor}
          title="Get Started"
          onPress={() => navigation.navigate('Category')}
        />
      </View>
    </ScreenWrapper>
  );
};
export default GetStarted;
const styles = StyleSheet.create({
  imgContainer: {
    width: width,
    height: height / 1.35,
    backgroundColor: COLORS.white,
    padding: 40,
  },
  img: {
    width: '100%',
    height: '100%',
  },

  container: {
    width: width,
    height: height / 3.2,
    alignItems: 'center',
    backgroundColor: COLORS.primaryColor,
    position: 'absolute',
    bottom: 0,
    padding: 25,
  },
});
