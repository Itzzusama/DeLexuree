import PhoneInput from 'react-native-phone-number-input';
import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomText from './CustomText';
import { COLORS } from '../utils/COLORS';
import fonts from '../assets/fonts';
import Icons from './Icons';
const CountryPhoneInput = ({
  value = '+1',
  setValue,
  withLabel,
  onEndEditing,
  error,
  showCheck,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef();
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={{marginBottom: 20}}>
      {withLabel && (
        <CustomText
          label={withLabel}
          fontSize={16}
          fontFamily={fonts.medium}
          marginBottom={8}
        />
      )}
      <PhoneInput
        ref={ref}
        textInputStyle={{
          fontSize: 14,
          fontFamily: fonts.regular,
        }}
        defaultValue={value}
        defaultCode="US"
        layout="first"
        textInputProps={{
          placeholderTextColor: COLORS.gray,
          maxLength: 12,
          style: [styles.phoneInput, {flex: 1, backgroundColor: COLORS.white}],
          onFocus: handleFocus,
          onBlur: handleBlur,
          onEndEditing,
        }}
        countryPickerButtonStyle={{backgroundColor: COLORS.white}}
        codeTextStyle={[styles.phoneInput, {marginLeft: -8}]}
        containerStyle={[
          styles.phoneInputContainer,
          ,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.green
              : COLORS.grayBorder,
          },
        ]}
        textContainerStyle={[
          styles.textContainerStyle,
          {
            borderLeftColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.green
              : COLORS.grayBorder,
          },
        ]}
        onChangeFormattedText={formattedValue => setValue(formattedValue)}
      />
      {showCheck && value?.length ? (
        <Icons
          family={error ? 'Entypo' : 'AntDesign'}
          name={error ? 'circle-with-cross' : 'checkcircle'}
          size={20}
          color={error ? COLORS.red : COLORS.green}
          style={{position: 'absolute', right: 10, zIndex: 999, top: 15}}
          onPress={error ? () => setValue('') : false}
        />
      ) : null}
    </View>
  );
};
export default CountryPhoneInput;
const styles = StyleSheet.create({
  phoneInput: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: COLORS.black,
  },
  phoneInputContainer: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  textContainerStyle: {
    borderLeftWidth: 1,
    paddingVertical: 0,
    backgroundColor: COLORS.white,
  },
});