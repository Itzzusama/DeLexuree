import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import ScreenWrapper from '../../../components/ScreenWrapper';

import Header from '../../../components/Header';

import Item from './molecules/Item';

import {COLORS} from '../../../utils/COLORS';
import {get} from '../../../Services/ApiRequest';
import {useFocusEffect} from '@react-navigation/native';
import NoShow from '../../../components/NoShow';

const Notifications = ({navigation}) => {
  
  const handleNavigation = async item => {
    const dataToSend = {
      id: item?.otherUser?._id,
      img: item?.otherUser?.profilePicture,
      name: item?.otherUser?.fname+" " + item?.otherUser?.lname ,
      type:item?.otherUser?.type
    };
    navigation.navigate('InboxScreen', {data: dataToSend});
  };
  const [messagesArray, setMessagesArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getConversationList = async () => {
    setRefreshing(true);
    try {
      const response = await get('msg/conversations');
      // console.log('rhis i', response.data?.conversations);
      setMessagesArray(response.data?.conversations);
    } catch (error) {
      console.log('hhhhhhhh==========');
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getConversationList();
    }, []),
  );
  return (
    <ScreenWrapper
      paddingBottom={70}
      backgroundColor={COLORS.mainBg}
      paddingHorizontal={0.1}
      headerUnScrollable={() => <Header title="Messages" />}>
      {/* <View style={styles.heading}>
        <CustomText
          label="2 Unreads"
          fontFamily={fonts.medium}
          color={COLORS.authText}
        />
      </View> */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getConversationList}
          />
        }
        data={messagesArray}
        ListEmptyComponent={() => (
          <NoShow
            label="You have not received any messages"
            label2="All messages will appear here."
          />
        )}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <Item
            onPress={() => handleNavigation(item)}
            lastMsg={item?.lastMsg?.message}
            name={item?.otherUser?.fname+" F" + item?.otherUser?.lname }
            userName={item?.otherUser?.fname}
            // count={item?.unseen}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  heading: {
    padding: 15,
  },
});
