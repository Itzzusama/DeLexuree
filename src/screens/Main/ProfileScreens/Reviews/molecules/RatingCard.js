import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import fonts from '../../../../../assets/fonts';
import {COLORS} from '../../../../../utils/COLORS';

const RatingCard = ({userImage, userName, reviewText, rating}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: userImage}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.review}>{reviewText}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={20} color="#FFD700" />
        <Text style={styles.rating}>{rating}</Text>
      </View>
    </View>
  );
};

export default RatingCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.semiBold,
    color: COLORS.black,
    fontSize: 16,
  },
  review: {
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    fontFamily: fonts.regular,
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 4,
  },
});
