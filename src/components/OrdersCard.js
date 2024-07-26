import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

import CustomButton from './CustomButton';
import CustomText from './CustomText';
import ImageFast from './ImageFast';

import {className} from '../global-styles';
import {Images} from '../assets/images';
import {COLORS} from '../utils/COLORS';
import fonts from '../assets/fonts';

const OrdersCard = ({
  name,
  category,
  img,
  des,
  price,
  item,
  onPressChild = () => '',
}) => {

  // console.log("item--------------------------------",item);
  const navigation = useNavigation();
  const status = item?.status;
  const handleNavigation = async item => {
    const dataToSend = {
      id: item?.user?._id,
      img: item?.user?.profilePicture,
      name: item?.user?.fname + ' ' + item?.user?.lname,
      type: item?.user?.type,
    };
    navigation.navigate('InboxScreen', {data: dataToSend});
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.mainContainer}
      onPress={() => {
        navigation.navigate('OrderDetail', {details: item});
      }}>
      <ImageFast
        source={{uri: img}}
        style={{width: '42%', height: '100%'}}
        resizeMode={'stretch'}
        isView={true}
      />
      <View style={{width: '58%', padding: 10}}>
        <View style={styles.row}>
          <CustomText
            label={name}
            fontSize={13}
            fontFamily={fonts.regular}
            lineHeight={17}
            color={COLORS['3D']}
          />
          <CustomText
            label={`£${price}`}
            fontSize={11}
            fontFamily={fonts.medium}
            lineHeight={13.48}
            fontWeight={'400'}
            color={COLORS[26]}
          />
        </View>
        <CustomText
          label={category}
          fontSize={10}
          fontFamily={fonts.regular}
          lineHeight={20}
          fontWeight={'600'}
          color={COLORS[99]}
        />
        <CustomText
          label={des}
          fontSize={9}
          fontFamily={fonts.regular}
          lineHeight={12.6}
          fontWeight={'400'}
          color={COLORS['3B']}
          letterSpacing={0.3}
          numberOfLines={3}
        />
        <View style={className('flex align-center justify-between mt-1')}>
          <View style={className('flex align-center')}>
            <ImageFast
              source={{uri: item?.user?.profilePicture}}
              resizeMode="contain"
              style={{height: 20, width: 20, borderRadius: 99}}
            />
            <CustomText
              label={item?.user?.fname}
              fontSize={9}
              fontFamily={fonts.regular}
              lineHeight={22}
              fontWeight={'600'}
              color={COLORS['3D']}
              letterSpacing={-0.41}
              textStyle={className('ml-2')}
            />
          </View>
          <Pressable onPress={() => handleNavigation(item)}>
            <ImageFast
              source={Images.message}
              style={[
                {
                  resizeMode: 'center',
                  width: 18,
                  height: 16,
                },
              ]}
            />
          </Pressable>
        </View>
        {status == 'pending' && (
          <View style={className('flex align-self-end mt-2')}>
            <CustomButton
              title="Reject"
              customStyle={className('bg-9F w-15 h-6 rounded-1')}
              customText={{
                fontSize: 9,
                fontWeight: '600',
                bottom: 2,
                letterSpacing: -0.4,
                fontFamily: fonts.regular,
              }}
              onPress={() => onPressChild('rejected')}
            />
            <CustomButton
              title={'Accept'}
              customStyle={className(' ml-2 w-15 h-6 rounded-1')}
              customText={{
                fontSize: 9,
                fontWeight: '600',
                bottom: 2,
                letterSpacing: -0.4,
                fontFamily: fonts.regular,
              }}
              onPress={() => onPressChild('accepted')}
            />
          </View>
        )}
        {status == 'accepted' && (
          <View style={className('flex align-self-end mt-2')}>
            <CustomButton
              title={'Complete'}
              customStyle={className(' ml-2 w-15 h-6 rounded-1')}
              customText={{
                fontSize: 9,
                fontWeight: '600',
                bottom: 2,
                letterSpacing: -0.4,
                fontFamily: fonts.regular,
              }}
              onPress={() => onPressChild('completed')}
            />
          </View>
        )}

        {(status == 'completed' && !item?.to_rating) ? (
          <View style={className('align-self-end')}>
            <CustomButton
              title={'Review'}
              customStyle={className('mt-4 w-15 h-6 rounded-1')}
              customText={{
                fontSize: 9,
                fontWeight: '600',
                bottom: 2,
                letterSpacing: -0.4,
                fontFamily: fonts.regular,
              }}
              onPress={() => navigation.navigate('Review', {review: item})}
            />
          </View>
        ) : null}
        {status == 'cancelled' ? (
          <View style={className('align-self-end')}>
            <CustomText
              label={'Rejected'}
              fontSize={9}
              fontFamily={fonts.regular}
              fontWeight={'600'}
              color={COLORS.danger}
              letterSpacing={-0.41}
              marginTop={5}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default OrdersCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
