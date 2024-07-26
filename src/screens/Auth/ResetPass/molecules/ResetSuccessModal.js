import {StyleSheet, View} from 'react-native';
import React from 'react';

import CustomButton from '../../../../components/CustomButton';
import CustomModal from '../../../../components/CustomModal';
import CustomText from '../../../../components/CustomText';
import ImageFast from '../../../../components/ImageFast';

import {Images} from '../../../../assets/images';
import {COLORS} from '../../../../utils/COLORS';
import fonts from '../../../../assets/fonts';

const ResetSuccessModal = ({isVisible, onDisable}) => {
  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onDisable}>
      <View style={styles.mainContainer}>
        <ImageFast
          source={Images.resetPass}
          style={styles.image}
          resizeMode="contain"
        />
        <CustomText
          label="resSuccess"
          fontFamily={fonts.boldExtra}
          fontSize={18}
          textAlign="center"
          marginTop={20}
          marginBottom={20}
        />
        <CustomButton
          title="Go To Home"
          marginBottom={10}
          onPress={onDisable}
        />
      </View>
    </CustomModal>
  );
};

export default ResetSuccessModal;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
  },
});
