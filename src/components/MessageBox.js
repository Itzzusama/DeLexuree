/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { COLORS } from '../utils/COLORS';
import fonts from '../assets/fonts';
import { useSelector } from 'react-redux';

const MessageBox = ({item, user_id, time}) => {
  const {userData}=useSelector(state=>state.users)
  return (
    <View style={styles.container}>
      {user_id === userData?._id ? (
        <>
          <View style={styles.rightContainer}>
            <Text style={styles.rightmsg}>{item?.message}</Text>
          </View>
          <View
            style={[
              styles.rightContainer,
              {backgroundColor: COLORS.black, padding: 2},
            ]}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.leftContainer}>
            <Text style={styles.leftmsg}>{item?.message}</Text>
          </View>
          <View
            style={[
              styles.leftContainer,
              {backgroundColor: COLORS.black, padding: 2},
            ]}>
            <Text style={[styles.timeText]}>{time}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  Image: {
    width: 32,
    borderRadius: 32,
    height: 32,
    borderColor: COLORS.black,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  leftContainer: {
    alignItems: 'flex-start',
    maxWidth: '80%',
    backgroundColor: '#383838',
    overflow: 'hidden',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    padding: 10,
    alignSelf: 'flex-start',
  },
  rightContainer: {
    alignItems: 'flex-end',
    maxWidth: '80%',
    backgroundColor: '#383838',
    overflow: 'hidden',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    padding: 10,
    alignSelf: 'flex-end',
  },
  leftmsg: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  rightmsg: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  timeText: {
    color: COLORS.white,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 5,
  },
});

export default MessageBox;