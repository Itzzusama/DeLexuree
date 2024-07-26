import {TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';

import CustomText from './CustomText';

import {COLORS} from '../utils/COLORS';
import fonts from '../assets/fonts';

const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
  customStyle,
  customText,
  marginBottom,
  marginTop,
  backgroundColor,
  color,
  width = '100%',
  height = 56,
  borderRadius = 8,
  justifyContent = 'center',
  alignItems = 'center',
  flexDirection = 'row',
  alignSelf = 'center',
  fontSize,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      style={[
        {
          backgroundColor: disabled
            ? COLORS.gray
            : backgroundColor
            ? backgroundColor
            : COLORS.primaryColor,
          marginTop,
          marginBottom,
          width,
          height,
          borderRadius,
          flexDirection,
          alignItems,
          justifyContent,
          alignSelf,
        },
        customStyle,
      ]}
      onPress={onPress}>
      {loading && <ActivityIndicator size={25} color={COLORS.white} />}
      {!loading && (
        <CustomText
          textStyle={customText}
          label={title}
          color={color ? color : COLORS.white}
          fontFamily={fonts.semiBold}
          fontSize={fontSize || 18}
          lineHeight={22}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
