import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import React from 'react';

import CustomText from './CustomText';
import Icons from './Icons';

import {COLORS} from '../utils/COLORS';
import fonts from '../assets/fonts';

const Header = ({
  title,
  onAddPress,
  onEditPress,
  hideBackArrow,
  onSettingPress,
  onBackPress,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={{width: '15%'}}>
        {hideBackArrow ? null : (
          <Icons
            family="Ionicons"
            name="arrow-back"
            size={22}
            color={COLORS.black}
            onPress={
              onBackPress
                ? onBackPress
                : () => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    } else {
                      navigation.navigate('MainStack');
                    }
                  }
            }
          />
        )}
      </View>
      <View style={{width: '70%', alignItems: 'center'}}>
        <CustomText label={title} fontSize={20} fontFamily={fonts.semiBold} />
      </View>
      <View style={{width: '15%', alignItems: 'flex-end'}}>
        {onAddPress ? (
          <Icons
            family="AntDesign"
            name="pluscircle"
            size={22}
            onPress={onAddPress}
            color={COLORS.black}
          />
        ) : onEditPress ? (
          <Icons
            family="Feather"
            name="edit"
            size={22}
            onPress={onEditPress}
            color={COLORS.black}
          />
        ) : onSettingPress ? (
          <Icons
            family="Feather"
            name="settings"
            size={22}
            onPress={onSettingPress}
            color={COLORS.black}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 0.7,
  },
});
