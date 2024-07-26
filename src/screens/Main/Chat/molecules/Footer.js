import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Icons from '../../../../components/Icons';

import {COLORS} from '../../../../utils/COLORS';
import fonts from '../../../../assets/fonts';

const Footer = ({inputText, setInputText, sendMessage}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          multiline
          textAlignVertical="top"
          onChangeText={text => setInputText(text)}
        />

        {inputText?.length ? (
          <TouchableOpacity style={{marginRight: 15}} onPress={sendMessage}>
            <Icons
              family="FontAwesome"
              name="send"
              size={22}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '20%',
              marginRight: 5,
            }}>
            <Icons
              family="AntDesign"
              name="plus"
              size={22}
              color={COLORS.gray}
              onPress={() => {}}
            />
            <Icons
              family="Feather"
              name="smile"
              size={22}
              color={COLORS.gray}
              onPress={() => {}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    width: '100%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    padding: 0,
    margin: 0,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: COLORS.black,
    maxHeight: 100,
  },
});
