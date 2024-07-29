import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import moment from 'moment';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomText from '../../../components/CustomText';

import Footer from './molecules/Footer';
import Header from './molecules/Header';

import {Images} from '../../../assets/images';
import {COLORS} from '../../../utils/COLORS';

import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from '../../../Services/ApiRequest';

const InboxScreen = ({route}) => {
  const flatListRef = useRef(null);
  const {userData} = useSelector(state => state.users);

  const dispatch = useDispatch();
  const data = route.params?.data;
  // const data = {id: '6622237907b267445d3c04b7'};
  const {users} = useSelector(store => store.users);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const userId = userData?._id;

  const handleScroll = () => {
    setScrolled(true);
  };

  const fetchMessages = async () => {
    try {
      const response = await get('msg/messages/' + data?.id);
      if (response.data) {
        setMessages(response.data?.messages);
      }
    } catch (error) {
      console.log('errrrrrr', error);
    }
  };

  const getMoreMessages = async () => {
    try {
      if (messages?.length > 0 && !bottomLoader) {
        setBottomLoader(true);
        const lastId = messages[messages?.length - 1]?._id;
        const url = 'msg/messages/' + data?.id + '/' + 'User' + '/' + lastId;
        const response = await get(url);
        if (response.data?.success) {
          setMessages([...messages, ...response.data?.messages]);
        }
        setTimeout(() => {
          setBottomLoader(false);
          setScrolled(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error, 'in getting more msgs');
      setTimeout(() => {
        setBottomLoader(false);
        setScrolled(false);
      }, 1000);
    }
  };

  const sendMsg = () => {
    if (socket) {
      socket.emit('send-message', {
        recipientId: data?.id,
        messageText: inputText,
        name: users?.first_name,
      });
      setInputText('');
    } else {
      console.log('Socket is null or not properly initialized');
    }
  };

  const capitalizeFirstLetter = string => {
    return string?.charAt(0).toUpperCase() + string?.slice(1) || '';
  };

  useEffect(() => {
    const newSocket = io('https://api.tideandtidy.co.uk/');


    newSocket.on('connect', async () => {
      const token = await AsyncStorage.getItem('token');
      newSocket.emit('authenticate', token);
    });

    newSocket.on('authenticated', id => {
      setSocket(newSocket);
    });

    newSocket.on('send-message', msg => {
      setMessages(prevMessages => [msg, ...prevMessages]);
    });

    newSocket.on('send_message_error', error => {
      console.log('error', error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (data?.id) {
      fetchMessages();
    }
  }, [data?.id]);

  useEffect(() => {
    getMoreMessages();
  }, [scrolled]);

  const renderMessage = ({item}) => (
    <>
      <View
        style={[
          styles.messageContainer,
          item.sender == userId ? styles.userMessage : styles.otherMessage,
        ]}>
        <CustomText
          label={item.message}
          color={item.sender == userId ? COLORS.white : COLORS.black}
          lineHeight={25}
        />
        <CustomText
          label={moment(item.createdAt).format('h:mm A')}
          color={COLORS.white}
          alignSelf={item.sender == userId ? 'flex-end' : 'flex-start'}
        />
      </View>
    </>
  );

  return (
    <ScreenWrapper
      paddingHorizontal={10}
      backgroundColor={COLORS.mainBg}
      footerUnScrollable={() => (
        <Footer
          inputText={inputText}
          setInputText={setInputText}
          sendMessage={sendMsg}
        />
      )}
      headerUnScrollable={() => (
        <Header source={Images.user} title={'Jeff D. Powell'} desc={'Service Expert'} />
      )}>
      <FlatList
        ref={flatListRef}
        data={messages}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={renderMessage}
        // renderItem={({item}) => {
        //   return (
        //     <MessageBox
        //       item={item}
        //       user_id={users?._id}
        //       time={moment(item?.createdAt).format('HH:mm A')}
        //     />
        //   );
        // }}
        keyExtractor={(_, i) => i.toString()}
        style={styles.messageList}
        onScrollEndDrag={handleScroll}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.mainBg,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 14,
    borderRadius: 15,
    marginTop: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#28306A',
    borderBottomRightRadius: 0,
    elevation: 1,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gray,
    borderBottomLeftRadius: 0,
    elevation: 1,
  },
});

export default InboxScreen;
