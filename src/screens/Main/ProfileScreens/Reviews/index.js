import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../../../components/ScreenWrapper';
import Header from '../../../../components/Header';
import {get} from '../../../../Services/ApiRequest';
import {useSelector} from 'react-redux';
import NoShow from '../../../../components/NoShow';
import RatingCard from './molecules/RatingCard';
import {Images} from '../../../../assets/images';

const Reviews = () => {
  const {userData} = useSelector(state => state.users);
  const [refreshing, setRefreshing] = useState(false);
  const [ratings, setRatings] = useState([]);

  const getReviews = async () => {
    setRefreshing(true);
    try {
      const response = await get('rating/all/' + userData?._id);
      //   console.log('response: ', response.data?.ratings);
      setRatings(response.data?.ratings);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <ScreenWrapper
      paddingHorizontal={12}
      headerUnScrollable={() => <Header title="Reviews" border={0.1} />}>
      <FlatList
        ListEmptyComponent={() => (
          <NoShow
            label={`No Reviews found`}
            label2={'There are no Reviews for now, check back later'}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getReviews} />
        }
        data={ratings}
        keyExtractor={item => item.id} // Assuming 'id' is a unique identifier for each order
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <RatingCard
            userImage={
              item?.user?.profilePicture
                ? item?.user?.profilePicture
                : 'https://letslivetogetherngo.files.wordpress.com/2021/10/sample-dp-3.jpg'
            }
            userName={item?.user?.fname + ' ' + item?.user?.lname}
            reviewText={item?.review}
            rating={item?.rating}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
