import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
} from 'react-native';

import Item from './item';

import {COLORS} from '../../../utils/COLORS';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import fonts from '../../../assets/fonts';
import {setUserCategory} from '../../../store/reducer/AuthConfig';
import {Images} from '../../../assets/images';

const Category = ({navigation}) => {
  const dispatch = useDispatch();
  const {userCategory} = useSelector(state => state.authConfigs);
  console.log('cat---', userCategory);
  
  const userTypeOptions = [
    {
      id: 1,
      img: Images.cleaning,
      title: 'cleaning',
    },
    {
      id: 2,
      img: Images.accomodation,
      title: 'accomodation',
    },
    {
      id: 3,
      img: Images.laundry,
      title: 'laundry',
    },
    {
      id: 4,
      img: Images.shoe_cleaning,
      title: 'shoe Cleaning',
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={COLORS.white}
      />
      <View>
        <CustomText
          label="Select You Job Type"
          fontFamily={fonts.semiBold}
          fontSize={30}
          marginTop={40}
          marginBottom={14}
        />
        <CustomText
          label="Select any category You wat to get started"
          fontFamily={fonts.semiBold}
          fontSize={20}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={userTypeOptions}
          renderItem={({item}) => (
            <Item
              key={item.id}
              source={item.img}
              title={
                item?.title == 'cleaning'
                  ? 'Cleaning Services'
                  : item?.title == 'laundry'
                  ? 'Laundry Services'
                  : item?.title == 'shoe Cleaning'
                  ? 'Shoe Cleaning Services'
                  : 'Accommodation'
              }
              onPress={() => dispatch(setUserCategory(item.title))}
              isActive={userCategory === item.title}
            />
          )}
          keyExtractor={item => item.id.toString()} // Assuming id is unique
          numColumns={2}
        />
      </View>
      <View>
        <CustomButton
          title="Next"
          marginBottom={20}
          onPress={() => navigation.navigate('Signup')}
        />
        <CustomText
          label="I already have an account"
          fontSize={16}
          fontFamily={fonts.semiBold}
          alignSelf="center"
          marginBottom={30}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 36,
  },
  helpText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default Category;
