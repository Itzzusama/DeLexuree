import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomText from '../../../components/CustomText';
import {ToastMessage} from '../../../utils/ToastMessage';
import {className} from '../../../global-styles';
import fonts from '../../../assets/fonts';
import {COLORS} from '../../../utils/COLORS';
import CategoryCard from '../../../components/OrderCategoryCard';
import {Images} from '../../../assets/images';
import CustomHeader from '../../../components/CustomHeader';
import ImageFast from '../../../components/ImageFast';
import CustomButton from '../../../components/CustomButton';
import moment from 'moment';
import {put} from '../../../Services/ApiRequest';
const OrderDetail = ({route, navigation}) => {
  const details = route.params?.details;

  const updateOrderStatus = async key => {
    console.log('key--', key);
    try {
      const response = await put(
        'order/employee/update/' + key + '/' + details?._id,
      );
      if (response.data?.success) {
        ToastMessage(response.data?.message);
        navigation.goBack();
      }
      console.log('res=====>', response.data);
    } catch (error) {
      console.log('errr---------', error);
    }
  };

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
    <ScreenWrapper
      paddingHorizontal={'0%'}
      scrollEnabled={true}
      translucent={true}
      statusBarColor="transparent">
      <View style={className('flex-1')}>
        <ImageBackground
          source={{uri: details?.service?.images[0]}}
          style={className('h-55')}
          resizeMode="cover">
          <View style={className('my-5 mx-5')}>
            <CustomHeader
              lable="All Orders"
              showLable={false}
              customStyle={className('mt-8')}
              customImg={{tintColor: COLORS.white}}
            />
            <CustomText
              label={details?.service?.title}
              fontSize={20}
              color={COLORS.white}
              fontFamily={fonts.semiBold}
              marginTop={55}
            />
            <CustomText
              label={details?.service?.category.charAt(0).toUpperCase() + details?.service?.category.slice(1)}

              fontSize={14}
              color={COLORS.smoke}
              fontFamily={fonts.regular}
            />
          </View>
        </ImageBackground>
        <View style={className('flex-grow')}>
          <CustomText
            label={'Order Description'}
            fontSize={14}
            color={COLORS.primaryColor}
            fontFamily={fonts.regular}
            textStyle={className(' mt-2 mx-5')}
          />
          <CustomText
            label={details?.service?.description}
            fontSize={14}
            color={COLORS[75]}
            fontFamily={fonts.regular}
            lineHeight={22}
            textStyle={className('my-3 mx-5')}
          />
          <View
            style={className(
              'flex align-center justify-between flex-grow mt-5',
            )}>
            <CustomText
              label={'Price'}
              fontSize={14}
              color={COLORS[75]}
              fontFamily={fonts.regular}
              lineHeight={22}
              textStyle={className(' mx-5')}
            />
            <CustomText
              label={'£' + details?.service?.price}
              fontSize={14}
              color={COLORS[22]}
              fontFamily={fonts.regular}
              lineHeight={22}
              textStyle={className(' mx-5')}
            />
          </View>
          <View
            style={className(
              'flex align-center justify-between flex-grow mt-5',
            )}>
            <CustomText
              label={'Duration'}
              fontSize={14}
              color={COLORS[75]}
              fontFamily={fonts.regular}
              lineHeight={22}
              textStyle={className(' mx-5')}
            />
            {details?.category == 'accomodation' ? (
              <CustomText
                label={
                  moment(details?.date).format('DD-MM-YYYY') +
                  '-' +
                  moment(details?.time).format('DD-MM-YYYY')
                }
                fontSize={14}
                color={COLORS[22]}
                fontFamily={fonts.regular}
                lineHeight={22}
                textStyle={className(' mx-5')}
              />
            ) : (
              <CustomText
                label={moment(details?.date).format('DD-MM-YYYY')}
                fontSize={14}
                color={COLORS[22]}
                fontFamily={fonts.regular}
                lineHeight={22}
                textStyle={className(' mx-5')}
              />
            )}
          </View>

          <View style={className('bor-b-1 border-EF mt-8')} />
          <CustomText
            label={'Booking Information'}
            fontSize={14}
            color={COLORS.primaryColor}
            fontFamily={fonts.medium}
            textStyle={className(' mt-2 mx-5')}
          />
          <View
            style={className('flex align-center justify-between mt-1 mx-5')}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserProfile', {user: details?.user})
              }
              style={className('flex align-center')}>
              <ImageFast
                source={{
                  uri: details?.user?.profilePicture
                    ? details?.user?.profilePicture
                    : 'https://lh4.googleusercontent.com/proxy/rxQrcISNW6c152TqWIA9iND_qakd02mJVLg8nSRrwxla5LSGonSX6tOxyhSbS9NWTuXZ4xXKJvzXPPfsfLxHEflyoqfrUDN3HMnLqJUpuE6y',
                }}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'stretch',
                  borderRadius: 99,
                }}
              />
              <View>
                <CustomText
                  label={details?.name}
                  fontSize={15}
                  fontFamily={fonts.regular}
                  fontWeight={'600'}
                  color={COLORS['3D']}
                  letterSpacing={-0.41}
                  textStyle={className('ml-2')}
                />
                {/* <CustomText
                  label={details?.phone}
                  fontSize={14}
                  fontFamily={fonts.regular}
                  fontWeight={'600'}
                  color={COLORS['3D']}
                  letterSpacing={-0.41}
                  textStyle={className('ml-2')}
                /> */}
              </View>
            </TouchableOpacity>
            <Pressable onPress={() => handleNavigation(details)}>
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
          {/* <CustomText
            label={details?.user?.location[0]?.address}
            fontSize={14}
            color={COLORS[75]}
            fontFamily={fonts.regular}
            lineHeight={22}
            textStyle={className(' mx-5 ml-15')}
            numberOfLines={1}
          /> */}
          <CustomText
            label={moment(details?.createdAt).format(
              'MMMM DD, YYYY [at] hh:mm A',
            )}
            fontSize={18}
            color={COLORS.black}
            fontFamily={fonts.medium}
            textStyle={className(' mt-2 mx-7')}
          />
        </View>
      </View>
      {details?.status == 'pending' ? (
        <View style={className('mx-5 mt-10')}>
          <CustomButton
            title={'Accept'}
            onPress={() => updateOrderStatus('accepted')}
            textStyle={{fontSize: 16, fontFamily: fonts.regular}}
          />
          <CustomButton
            title={'Reject'}
            textStyle={{fontSize: 16, fontFamily: fonts.regular}}
            customStyle={className('bg-9F mt-2')}
            onPress={() => updateOrderStatus('rejected')}
          />
        </View>
      ) : null}
    </ScreenWrapper>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({});
