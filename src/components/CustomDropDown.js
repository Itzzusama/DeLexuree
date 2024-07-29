import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  View,
  Image,
  Text,
} from 'react-native';

import CustomText from './CustomText';
import Icons from './Icons';

import {COLORS} from '../utils/COLORS';
import fonts from '../assets/fonts';

const CustomDropDown = ({
  options,
  value,
  setValue,
  placeholder,
  icon,
  withLabel,
  isRequired,
  maxHeight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-1000)).current;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: isOpen ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: isOpen ? -1000 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleSelect = option => {
    setValue(option);
    toggleDropdown();
  };

  return (
    <>
      {withLabel ? (
        <Text style={styles.withLabelStyle}>
          {withLabel}
          {isRequired && <Text style={{color: COLORS.red}}> *</Text>}
        </Text>
      ) : null}
      <View style={{width: '100%'}}>
        <TouchableOpacity
          style={[styles.mainContainer, {marginBottom: isOpen ? 5 : 20}]}
          onPress={toggleDropdown}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {icon && <Image source={icon} style={styles.leftIcon} />}
            <CustomText
              label={value || placeholder}
              color={value ? COLORS.black : COLORS.grey}
              marginLeft={10}
            />
          </View>
          <Icons
            family="Entypo"
            size={24}
            color={COLORS.black}
            name={isOpen ? 'chevron-up' : 'chevron-down'}
          />
        </TouchableOpacity>

        {isOpen && (
          <Animated.View
            style={[
              styles.dropdown,
              {opacity, transform: [{translateY}], maxHeight: maxHeight || 165},
            ]}>
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}>
              {options?.map(option => (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.listItemContainer}
                  key={option}
                  onPress={() => handleSelect(option)}>
                  <CustomText
                    fontSize={12}
                    fontFamily={fonts.medium}
                    label={option}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: 'space-between',
    borderRadius: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 6,
    elevation: 3,
    zIndex: 2,
    marginBottom: 20,
  },
  listItemContainer: {
    borderBlockColor: COLORS.lightGray,
    borderBottomWidth: 1,
    padding: 12,
  },
  leftIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  withLabelStyle: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.black,
    marginBottom: 5,
  },
});

export default CustomDropDown;
