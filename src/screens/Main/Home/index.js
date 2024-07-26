import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import ScreenWrapper from '../../../components/ScreenWrapper';
import OrdersCard from '../../../components/OrdersCard';
import CustomText from '../../../components/CustomText';

import Header from './molecules/Header';

import {COLORS} from '../../../utils/COLORS';
import fonts from '../../../assets/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {get, post, put} from '../../../Services/ApiRequest';
import {ToastMessage} from '../../../utils/ToastMessage';
import {useFocusEffect} from '@react-navigation/native';
import NoShow from '../../../components/NoShow';
import {getProfile} from '../../../utils/constants';
import {setUserData} from '../../../store/reducer/usersSlice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const {userData} = useSelector(state => state.users);
console.log("userData?.category--------------------",userData?.category);
  const getOrders = async () => {
    try {
      setLoading(true);
      const body = {
        status: 'all',
        category: userData?.category,
        sub_cat: '',
      };
      const response = await post('order/employee/filter/', body);
      console.log("response: " , response.data);
      setOrders(response.data?.orders);
      ToastMessage(response?.data?.message);
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (key, item) => {
    try {
      const response = await put(
        'order/employee/update/' + key + '/' + item?._id,
      );
      if (response.data?.success) {
        ToastMessage(response.data?.message);
        getOrders();
      }
      console.log('res=====>', response.data);
    } catch (error) {
      console.log('errr---------', error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await get('users/me');
      dispatch(setUserData(response.data?.user));
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      getOrders();
    }, []),
  );
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ScreenWrapper
      backgroundColor={COLORS.mainBg}
      headerUnScrollable={() => (
        <>
          <Header
            userName={userData?.fname + ' ' + userData?.lname}
            isNotification
          />
          <View style={styles.row}>
            <CustomText
              label="New jobs"
              fontSize={18}
              fontFamily={fonts.medium}
              lineHeight={20}
              fontWeight={'600'}
              color={'black'}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllOrders');
              }}>
              <CustomText
                label="See All"
                fontSize={13}
                fontFamily={fonts.regular}
                lineHeight={20}
                fontWeight={'600'}
                color={COLORS['3D']}
              />
            </TouchableOpacity>
          </View>
          {/* <ButtonTab tab={tab} setTab={setTab} /> */}
        </>
      )}>
      <View style={{marginVertical: 12}} />

      <FlatList
        data={orders}
        ListEmptyComponent={
          <NoShow
            label={'You don’t have any active jobs'}
            label2={'Always keep yourself available to get new jobs'}
          />
        }
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getOrders} />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <OrdersCard
            name={item.name}
            category={item?.category}
            img={item?.service?.images[0]}
            des={item?.service?.description}
            price={item?.service?.price}
            item={item}
            onPressChild={key => updateOrderStatus(key, item)}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
    backgroundColor: COLORS.mainBg,
    elevation: 3,
  },
});
