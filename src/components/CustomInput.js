import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import CustomText from './CustomText';
import Icons from './Icons';

import {COLORS} from '../utils/COLORS';
import i18n from '../Language/i18n';
import fonts from '../assets/fonts';
import {Icon} from '@rneui/base';
import _ from 'lodash';

const CustomInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  multiline,
  maxLength,
  placeholderTextColor,
  editable,
  textAlignVertical,
  marginBottom,
  height,
  autoCapitalize,
  error,
  isFocus,
  isBlur,
  width,
  onEndEditing,
  autoFocus,
  ref,
  searchIcon,
  borderRadius,
  marginTop,
  withLabel,
  onMail,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePass, setHidePass] = useState(true);


  const handleFocus = () => {
    setIsFocused(true);
    isFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    isBlur?.();
  };

  return (
    <>
      {withLabel && (
        <CustomText
          label={withLabel}
          marginBottom={5}
          fontSize={18}
          fontFamily={fonts.semiBold}
        />
      )}
      <View
        style={[
          styles.mainContainer,
          {
            marginBottom: error?5: marginBottom || 20,
            marginTop,
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primaryColor
              : COLORS.lightGray,
            height: height || 55,
            width: width || '100%',
            borderRadius: borderRadius || 8,
          },
        ]}>
        {searchIcon && (
          <Icons
            family="Feather"
            name="search"
            size={20}
            color={COLORS.authText}
          />
        )}

        <TextInput
          ref={ref}
          placeholder={i18n.t(placeholder)}
          style={[
            styles.input,
            {
              width: secureTextEntry ? '92%' : '98%',
              paddingVertical: multiline ? 18 : 0,
              paddingHorizontal: searchIcon || onMail ? 10 : 0,
            },
          ]}
          secureTextEntry={secureTextEntry ? (hidePass ? true : false) : false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          onEndEditing={onEndEditing}
          maxLength={maxLength}
          placeholderTextColor={placeholderTextColor || COLORS.authText}
          editable={!editable}
          textAlignVertical={multiline ? 'top' : textAlignVertical}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
        />
         {secureTextEntry && (
          <TouchableOpacity
            style={{
              width: '8%',
              alignItems: 'flex-end',
              justifyContent: 'center',
              
            }}
            onPress={() => {
              setHidePass(!hidePass);
            }}>
            <Icon
              name={!hidePass ? 'eye' : 'eye-off'}
              color={COLORS.gray}
              size={20}
              type="ionicon"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <CustomText label={error} color={COLORS.red} marginBottom={20} />
      )}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  input: {
    height: '100%',
    padding: 0,
    margin: 0,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: COLORS.black,
  },
});
