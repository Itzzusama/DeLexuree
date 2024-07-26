import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomHeader from '../../../components/CustomHeader';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import fonts from '../../../assets/fonts';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {post} from '../../../Services/ApiRequest';
import {ToastMessage} from '../../../utils/ToastMessage';

const Review = ({route}) => {
  const navigation = useNavigation();
  const review = route.params?.review;
  const [rating, setRating] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [reviews, setReviews] = useState('');
  const handleRating = rated => {
    setRating(rated);
  };
  console.log("review----------------",review);

  const addReview = async () => {
    const body2 = {
      to_id: review?.user?._id,
      rating: rating,
      review: reviews,
      order: review?._id,
      type: 'employee',
    };
    setRefreshing(true);
    try {
      const response = await post('rating/create', body2);
      console.log('response: ', response?.data);
      if (response.data?.success) {
        ToastMessage(response.data?.message);
        navigation.goBack();
      }
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icons
          family={'FontAwesome'}
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={42}
          color={i <= rating ? 'gold' : 'grey'}
          onPress={() => handleRating(i)}
          style={{marginRight: 16}}
        />,
      );
    }
    return stars;
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <CustomHeader lable={'Add Review'} />}>
      <CustomText label={'Give Rating'} fontSize={16} fontFamily={fonts.bold} />
      <View style={styles.starsContainer}>{renderStars()}</View>
      <CustomText label={'Add Review'} fontSize={16} fontFamily={fonts.bold} />
      <CustomInput
        value={reviews}
        onChangeText={text => setReviews(text)}
        multiline
        placeholder={'Add Review'}
        marginTop={8}
      />
      <View style={{flex: 1}} />
      <CustomButton
        title={'Add Review'}
        marginBottom={12}
        onPress={addReview}
        loading={refreshing}
      />
    </ScreenWrapper>
  );
};

export default Review;

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
