import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Header from '../../../components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Card from './molecules/Card';
import {get} from '../../../Services/ApiRequest';
import CustomButton from '../../../components/CustomButton';

const Accommodation = ({route}) => {
  const navigation = useNavigation();
  const isSkip = route.params?.isSkip;
  console.log('isSkip----------------', isSkip);

  const [refreshing, setRefreshing] = useState(false);
  const [services, setServices] = useState([]);

  const getMyServices = async () => {
    setRefreshing(true);
    try {
      setRefreshing(true);
      const response = await get('service/me/all');
      setServices(response.data?.services);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getMyServices();
    }, []),
  );

  return (
    <>
      <ScreenWrapper
        paddingBottom={4}
        headerUnScrollable={() => (
          <Header
            title="Accommodation"
            onAddPress={() => navigation.navigate('NewAccommodation')}
          />
        )}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={services}
          keyExtractor={(_, i) => i.toString()}
          refreshControl={
            <RefreshControl onRefresh={getMyServices} refreshing={refreshing} />
          }
          renderItem={({item, index}) => (
            <Card
              image={item?.images[0]}
              title={item?.title}
              rooms={item?.accomodation?.beds}
              washrooms={item?.accomodation?.bath}
              price={item?.price}
              onEditPress={() =>
                navigation.navigate('NewAccommodation', {
                  item: item,
                  isEdit: true,
                })
              }
            />
          )}
        />
        {(isSkip && services?.length == 0) && (
          <CustomButton
            title={'Skip'}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'MainStack',
                    state: {
                      routes: [
                        {
                          name: 'TabStack',
                        },
                      ],
                    },
                  },
                ],
              })
            }
          />
        )}
        {(services?.length > 0 && isSkip )&& (
          <CustomButton
            title={'Continue'}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'MainStack',
                    state: {
                      routes: [
                        {
                          name: 'TabStack',
                        },
                      ],
                    },
                  },
                ],
              })
            }
          />
        )}
      </ScreenWrapper>
    </>
  );
};

export default Accommodation;

const styles = StyleSheet.create({});
