import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import 'intl-pluralrules';

import Notification from './Notification';

import {getToken} from './src/utils/constants';
import {persistor, store} from './src/store';
import Navigation from './src/navigation';
import i18n from './src/Language/i18n';
import {COLORS} from './src/utils/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
 
  const [isVisible, setVisible] = useState(false);
  const [notification, setNotification] = useState(null);

 
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setNotification({
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
      });
      setVisible(true);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    }
  }, [isVisible]);
  useEffect(() => {
    getToken();
  }, []);

  return (
    <RootSiblingParent>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.primaryColor}
      />
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Navigation />
              {isVisible && (
                <Notification
                  isVisible={isVisible}
                  title={notification?.title}
                  desc={notification?.body}
                />
              )}
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </RootSiblingParent>
  );
};

export default App;
