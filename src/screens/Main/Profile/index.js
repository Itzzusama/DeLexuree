import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomText from '../../../components/CustomText';
import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomHeader from '../../../components/CustomHeader';
import {className} from '../../../global-styles';
import ImageFast from '../../../components/ImageFast';
import {Images} from '../../../assets/images';
import UserDetail from './UserDetail';
import fonts from '../../../assets/fonts';
import {COLORS} from '../../../utils/COLORS';
import LogoutModal from './LogoutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../../store/reducer/AuthConfig';
import {get} from '../../../Services/ApiRequest';
import {setUserData} from '../../../store/reducer/usersSlice';
import TextSpaceBetween from '../../../components/TextSpaceBetween';
import moment from 'moment';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLogoutModal, setLogoutModal] = useState(false);
  const {userData} = useSelector(state => state.users);
  const isProfilePicture = userData?.profilePicture;
  // console.log("userData: " , userData);

  const getProfile = async () => {
    try {
      const response = await get('users/me');
      dispatch(setUserData(response.data?.user));
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, []),
  );
  const general_screen = [
    {
      id: 'EditProfile',
      name: 'Edit Profile',
    },
    {
      id: 'ChangePassword',
      name: 'Change Password',
    },
  ];
  const other_screen = [
    ...(userData?.category === 'accomodation'
      ? [
          {
            id: 'Accommodation',
            name: 'Accommodations',
          },
        ]
      : []),
    {
      id: 'Reviews',
      name: 'Reviews',
    },
    {
      id: 'HelpCenter',
      name: 'Help Center',
    },
    {
      id: 'TermsCondition',
      name: 'Terms and Conditions',
    },
    {
      id: 'PrivacyPolicy',
      name: 'Privacy Policy',
    },
  ];
  const renderOption = ({item}) => (
    <TouchableOpacity
      style={className(
        'flex align-center justify-between bor-b-1 border-EF py-4 px-5 bg-white',
      )}
      onPress={() => {
        navigation.navigate(item.id);
      }}>
      <View style={className('flex align-center')}>
        {(item.id == 'EditProfile' || item.id == 'ChangePassword') && (
          <View
            style={className(
              'bg-skyBlue rounded-7 align-center justify-center h-10 w-10 mr-4',
            )}>
            <ImageFast
              source={item.id == 'EditProfile' ? Images.profile : Images.lock}
              style={[className('h-5 w-5 ')]}
            />
          </View>
        )}

        <CustomText
          label={item.name}
          fontSize={16}
          fontFamily={fonts.medium}
          color={COLORS[22]}
        />
      </View>
      <ImageFast source={Images.arrow_right} style={className('h-4 w-4 ')} />
    </TouchableOpacity>
  );
  return (
    <ScreenWrapper
      paddingHorizontal={'0%'}
      backgroundColor={'#F8F8F8'}
      scrollEnabled={true}
      headerUnScrollable={() => (
        <View
          style={[
            className('flex align-center justify-between px-5 bg-white'),
          ]}>
          <CustomHeader lable={'Profile'} showIcon={false} />
          <TouchableOpacity
            onPress={() => {
              setLogoutModal(true);
            }}>
            <ImageFast source={Images.logout} style={{height: 19, width: 16}} />
          </TouchableOpacity>
        </View>
      )}>
      <View style={className('bg-white rounded-br-6 rounded-bl-6 h-15')} />
      <UserDetail
        rating={userData?.rating.toFixed(2)}
        avatar={
          isProfilePicture ? {uri: isProfilePicture} : Images.sampleProfile
        }
        name={userData?.fname + ' ' + userData?.lname}
        email={userData?.email}
        completed_orders={userData?.completedOrder}
        active_orders={userData?.activeOrder}
      />
      <View style={{paddingHorizontal: 20, bottom: 25}}>
        <TextSpaceBetween
          leftText={'Born at'}
          rightText={moment(userData?.dob).format('DD-MM-YYYY')}
          leftImage={Images.born}
        />
        <TextSpaceBetween
          leftText={'Lives in'}
          rightText={userData?.location?.address}
          leftImage={Images.location}
        />
        <TextSpaceBetween
          leftText={'Speaks'}
          rightText={'English'}
          leftImage={Images.language}
        />

        <TextSpaceBetween
          leftText={'Phone'}
          rightText={userData?.phone}
          leftImage={Images.phone}
        />
        <TextSpaceBetween
          leftText={'Transportation Type'}
          rightText={
            userData?.driving == 'local' ? 'Public' : userData?.driving 
          }
          leftImage={Images.driving}
        />
        <TextSpaceBetween
          leftText={'Experience'}
          rightText={userData?.exp}
          leftImage={Images.sampleProfile}
        />
      </View>

      <View>
        <CustomText
          label={'General'}
          fontSize={14}
          fontFamily={fonts.medium}
          color={COLORS.gray2}
          marginLeft={20}
          textStyle={className('mb-4')}
        />
        <View style={className('flex-1')}>
          <FlatList
            data={general_screen}
            keyExtractor={item => {
              item.id;
            }}
            renderItem={renderOption}
          />
        </View>
        <CustomText
          label={'Others'}
          fontSize={14}
          fontFamily={fonts.medium}
          color={COLORS.gray2}
          marginLeft={20}
          textStyle={className('my-4')}
        />
        <View style={className('flex-1 mb-20')}>
          <FlatList
            data={other_screen}
            keyExtractor={item => {
              item.id;
            }}
            renderItem={renderOption}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <LogoutModal
        isVisible={isLogoutModal}
        onDisable={async () => {
          setLogoutModal(false);
          dispatch(setToken(''));
          // Remove token from AsyncStorage
          try {
            await AsyncStorage.removeItem('token');
          } catch (error) {
            console.log('Error removing token from AsyncStorage:', error);
          }
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'AuthStack',
                state: {
                  routes: [
                    {
                      name: 'Login',
                    },
                  ],
                },
              },
            ],
          });
        }}
        StayLoggedIn={() => {
          setLogoutModal(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
