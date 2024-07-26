import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import TextSpaceBetween from '../../../components/TextSpaceBetween';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Header from '../../../components/Header';
import CustomText from '../../../components/CustomText';
import fonts from '../../../assets/fonts';
import ImageFast from '../../../components/ImageFast';
import moment from 'moment';

const UserProfile = ({route}) => {
  const user = route.params.user;
  return (
    <ScreenWrapper headerUnScrollable={() => <Header title={'User Profile'} />}>
      <ImageFast
        isView
        source={{
          uri: user?.profilePicture
            ? user?.profilePicture
            : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
        }}
        style={styles.Image}
      />
      <CustomText
        label={user?.fname + user?.lname}
        alignSelf={'center'}
        fontFamily={fonts.bold}
        fontSize={20}
        marginBottom={20}
      />
      <TextSpaceBetween leftText={'Email'} rightText={user?.email} />
      <TextSpaceBetween leftText={'Phone'} rightText={user?.phone} />
      <TextSpaceBetween
        leftText={'DOB'}
        rightText={moment(user?.dob).format('DD-MM-YYYY')}
      />
      <TextSpaceBetween
        leftText={'Rating'}
        rightText={user?.rating?.toFixed(2)}
      />
    </ScreenWrapper>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  Image: {
    height: 120,
    width: 120,
    borderRadius: 99,
    alignSelf: 'center',
    marginVertical: 12,
  },
});
