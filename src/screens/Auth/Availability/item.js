import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from '../../../components/CustomText';
import fonts from '../../../assets/fonts';
import {COLORS} from '../../../utils/COLORS';

const Item = ({source, title, onPress, isActive}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.mainContainer,
        {backgroundColor: isActive ? COLORS.notification : COLORS.gray},
      ]}>
      <ImageBackground
        source={source}
        style={styles.imageBackground}
        resizeMode="cover"
        borderRadius={20}>
        <View style={styles.overlay}>
          <View
            style={
              isActive
                ? {
                    backgroundColor: COLORS.white,
                    paddingHorizontal: 12,
                    paddingBottom: 5,
                    alignSelf: 'center',
                    borderRadius: 6,
                  }
                : {
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    paddingHorizontal: 8,
                    paddingBottom: 5,
                    borderRadius: 6,
                    alignSelf: 'center',
                  }
            }>
            <CustomText
              fontFamily={fonts.semiBold}
              textAlign={'center'}
              fontSize={16}
              label={title}
              color={isActive ? COLORS.black : COLORS.white}
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  mainContainer: {
    width: '48%',
    height: 158,
    borderRadius: 12,
    margin: 4,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal:6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
  },
  textContainer: {
    paddingHorizontal: 8,
    paddingBottom: 5,
    borderBottomRightRadius: 10,
    alignSelf: 'flex-start',
  },
});
