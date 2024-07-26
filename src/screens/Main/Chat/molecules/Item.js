import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import CustomText from '../../../../components/CustomText';

import {Images} from '../../../../assets/images';
import {COLORS} from '../../../../utils/COLORS';
import fonts from '../../../../assets/fonts';

const Item = ({
  source = Images.mess,
  count = '',
  onPress,
  lastMsg,
  name,
  userName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} resizeMode="contain" />
      </View>

      <View style={{width: '82%'}}>
        <View style={styles.container}>
          <CustomText label={userName} In fontFamily={fonts.medium} />
          <CustomText
            label="12.45"
            marginTop={10}
            fontSize={12}
            color={COLORS.authText}
          />
        </View>
        <CustomText label={lastMsg} fontFamily={fonts.medium} fontSize={12} />
        <View style={styles.container}>
          {/* <CustomText
            label={lastMsg}
            numberOfLines={1}
            fontSize={12}
            color={COLORS.authText}
          /> */}
          {count && (
            <View style={styles.countStyle}>
              <CustomText
                label={count}
                fontFamily={fonts.semiBold}
                fontSize={12}
                color={COLORS.white}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBlockColor: COLORS.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: COLORS.lightGray,
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countStyle: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
