import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import fonts from '../assets/fonts';

const TextSpaceBetween = ({leftText, leftImage, rightText}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center'}}>

      {leftImage && <Image source={leftImage} style={styles.leftImage} />} 
      <CustomText label={leftText} fontFamily={fonts.semiBold} />
      </View>
      <View style={{width: '52%'}}>
        <CustomText label={rightText} numberOfLines={1} alignSelf={'flex-end'} />
      </View>
    </View>
  );
};

export default TextSpaceBetween;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:4
  },
  leftImage: {
    width: 18, 
    height: 18,
    marginRight: 8,
  },
});
