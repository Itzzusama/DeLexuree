import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

import CustomText from '../../../../components/CustomText';

import {Images} from '../../../../assets/images';
import {COLORS} from '../../../../utils/COLORS';
import fonts from '../../../../assets/fonts';

const Header = ({isNotification,userName}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <CustomText label="Welcome back," fontFamily={fonts.medium} />
          <CustomText
            label={userName}
            fontFamily={fonts.bold}
            fontSize={18}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Notifications')}>
          {isNotification && <View style={styles.dot} />}
          <Image source={Images.noti_icon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
    paddingHorizontal: 25,
    backgroundColor: COLORS.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: COLORS.notification,
    borderColor: '#DEFCFE',
    position: 'absolute',
    right: 0,
    zIndex: 99,
    top: -3,
  },
  icon: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
});
