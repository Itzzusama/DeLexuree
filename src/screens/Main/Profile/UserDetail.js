import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageFast from '../../../components/ImageFast';
import CustomText from '../../../components/CustomText';
import {className} from '../../../global-styles';
import fonts from '../../../assets/fonts';
import {COLORS} from '../../../utils/COLORS';
import Icons from '../../../components/Icons';
const UserDetail = ({name, email, avatar, completed_orders, active_orders,rating}) => {
  return (
    <View
      style={[
        className('justify-center align-center'),
        {zIndex: 1000, top: -45, },
      ]}>
      <ImageFast
        isView
        source={avatar}
        style={{height: 90, width: 90, borderRadius: 50}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText
          label={name}
          fontSize={18}
          fontFamily={fonts.semiBold}
          color={COLORS[22]}
        />
        <View
          style={{
            paddingVertical: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.gray1,
            borderRadius: 99,
            paddingHorizontal: 10,
            marginLeft: 6,
            marginTop:4
          }}>
          <Icons family={'FontAwesome'} size={10} name={'star'} />
          <CustomText label={rating} marginLeft={5} fontSize={10} />
        </View>
      </View>
      <CustomText
        label={email}
        fontSize={14}
        fontFamily={fonts.semiBold}
        color={COLORS.authText}
      />
      <View
        style={className(
          'flex justify-between align-center bg-white rounded-3 w-88 mt-4 p-6 px-12',
        )}>
        <View style={className('flex-column align-center')}>
          <CustomText
            label={completed_orders}
            fontSize={14}
            fontFamily={fonts.semiBold}
            color={COLORS[10]}
          />
          <CustomText
            label={'Completed Orders'}
            fontSize={12}
            fontFamily={fonts.semiBold}
            color={COLORS.gray2}
            marginTop={4}
          />
        </View>
        <View style={className('flex-column align-center')}>
          <CustomText
            label={active_orders}
            fontSize={14}
            fontFamily={fonts.semiBold}
            color={COLORS[10]}
          />
          <CustomText
            label={'Active Orders'}
            fontSize={12}
            fontFamily={fonts.semiBold}
            color={COLORS.gray2}
            marginTop={4}
          />
        </View>
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({});
