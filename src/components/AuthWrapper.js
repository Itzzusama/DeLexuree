import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyleSheet, View} from 'react-native';
import React from 'react';

import ImageFast from './ImageFast';
import {Images} from '../assets/images';
import CustomText from './CustomText';
import fonts from '../assets/fonts';
import {COLORS} from '../utils/COLORS';
import {className} from '../global-styles';

const AuthWrapper = ({
  children,
  scrollEnabled = false,
  heading = '',
  desc = '',
  index = 0,
  showStatus = false,
}) => {
  return (
    <KeyboardAwareScrollView
      scrollEnabled={scrollEnabled}
      style={{flex: 1}}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <ImageFast
        style={styles.logo}
        resizeMode="contain"
        source={Images.logoIcon}
      />
      {showStatus && (
        <View style={className('flex mt-7')}>
          <View
            style={[
              className('flex-1 rounded-1 h-1 bg-DD '),
              {
                backgroundColor:
                  index == 0 || index == 1 || index == 2
                    ? COLORS.primaryColor
                    : COLORS.DD,
              },
            ]}
          />
          <View
            style={[
              className('flex-1 rounded-1 h-1 bg-DD mx-2'),
              {
                backgroundColor:
                  index == 1 || index == 2 ? COLORS.primaryColor : COLORS.DD,
              },
            ]}
          />
          {/* <View
            style={[
              className("flex-1 rounded-1 h-1 bg-DD "),
              {
                backgroundColor: index == 2 ? COLORS.primaryColor : COLORS.DD,
              },
            ]}
          /> */}
        </View>
      )}

      <CustomText
        label={heading}
        fontFamily={fonts.boldExtra}
        fontSize={28}
        marginTop={showStatus ? 10 : 20}
        marginBottom={5}
      />
      <CustomText
        label={desc}
        fontSize={16}
        color={COLORS.authText}
        marginBottom={30}
      />

      {children}
    </KeyboardAwareScrollView>
  );
};

export default AuthWrapper;
const styles = StyleSheet.create({
  logo: {
    width: 42,
    height: 42,
    marginTop: 20,
    alignSelf:'center'
  },
});
