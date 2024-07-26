import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import ImageFast from '../../../../components/ImageFast';
import {COLORS} from '../../../../utils/COLORS';
import fonts from '../../../../assets/fonts';
const Card = ({title, rooms, washrooms, price, image, onEditPress}) => {
  return (
    <View style={styles.mainContainer}>
      <ImageFast source={{uri: image}} style={styles.image} />
      <View style={styles.container}>
        <CustomText
          label={title}
          fontFamily={fonts.bold}
          fontSize={20}
          numberOfLines={2}
        />
        <CustomText
          label={`${rooms} Rooms • ${washrooms} Bathrooms`}
          fontFamily={fonts.medium}
          numberOfLines={2}
          color={COLORS.gray2}
        />
        <CustomText
          label={`£${price} per night`}
          fontFamily={fonts.bold}
          fontSize={18}
        />
        <CustomText
          onPress={onEditPress}
          label={`Edit`}
          alignSelf={'flex-end'}
          color={COLORS.gray}
          fontFamily={fonts.semiBold}
          fontSize={14}
        />
      </View>
    </View>
  );
};
export default Card;
const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 15,
    borderWidth: 0.7,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.mainBg,
    overflow: 'hidden',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 250,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  container: {
    padding: 10,
  },
});
