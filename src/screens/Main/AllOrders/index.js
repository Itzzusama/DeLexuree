import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomHeader from '../../../components/CustomHeader';
import OrdersCard from '../../../components/OrdersCard';
import ButtonTab from '../../../components/ButtonTab';

import {className} from '../../../global-styles';
import {Images} from '../../../assets/images';
import {COLORS} from '../../../utils/COLORS';
import {post, put} from '../../../Services/ApiRequest';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {ToastMessage} from '../../../utils/ToastMessage';
import NoShow from '../../../components/NoShow';

const AllOrders = () => {
  const updateOrderStatus = async (key, item) => {
    try {
      const response = await put(
        'order/employee/update/' + key + '/' + item?._id,
      );
      if (response.data?.success) {
        ToastMessage(response.data?.message);
        getOrders();
      }
      // console.log('res=====>', response.data);
    } catch (error) {
      console.log('errr---------', error);
    }
  };

  const [tab, setTab] = useState('All');

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [lastOrderId, setLastOrderId] = useState('');

  const {userData} = useSelector(state => state.users);

  // const getOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const body = {
  //       status: 'all',
  //       category: userData?.category,
  //       sub_cat: '',
  //       id: '',
  //     };
  //     const response = await post('order/employee/filter/', body);
  //     setOrders(response.data?.orders);
  //     // console.log('res-------------', response.data);
  //     // ToastMessage(response?.data?.message);
  //   } catch (error) {
  //     console.log(error.response.data);
  //     ToastMessage(error?.response?.data?.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLoadMore = () => {
    if (!loading) {
      getOrders(lastOrderId);
    }
  };

  const getOrders = async (lastId = '') => {
    try {
      setLoading(true);
      const body = {
        status: 'all',
        category: userData?.category,
        sub_cat: '',
        id: lastId,
      };
      const response = await post('order/employee/filter/', body);
      const newOrders = response.data?.orders || [];
      setOrders(prevOrders => [...prevOrders, ...newOrders]);
      setLastOrderId(newOrders.length > 0 ? newOrders[newOrders.length - 1]?._id : '');
    } catch (error) {
      console.error("Error:", error);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <ScreenWrapper
      backgroundColor={COLORS.mainBg}
      headerUnScrollable={() => (
        <>
          <View style={className('bg-white px-5 py-3')}>
            <CustomHeader lable="All Jobs" />
          </View>
          {/* <ButtonTab tab={tab} setTab={setTab} /> */}
        </>
      )}>
      <FlatList
        ListEmptyComponent={
          <NoShow
            label={'You don’t have any active jobs'}
            label2={'Always keep yourself available to get new jobs'}
          />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getOrders} />
        }
        data={orders}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1} 
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

export default AllOrders;

const styles = StyleSheet.create({});
