/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";

import fonts from "../assets/fonts";
import Icons from "./Icons";
import { COLORS } from "../utils/COLORS";

const SearchBar = ({
  placeHolder,
  value,
  onChangeText,
  onEndEditing,
  editable,
  onFocus,
  autoFocus,
  home,
  marginTop,
  containerStyle,
  marginBottom,
  backgroundColor,
  onSearchPress = () => "",
}) => {
  return (
    <View
      style={[
        {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: marginTop,
          marginBottom: marginBottom,
          backgroundColor: backgroundColor,
          borderRadius: 100,
        },
        containerStyle,
      ]}
    >
      <Pressable
        onPress={onSearchPress}
        style={[
          styles.container,
          { width: home ? "80%" : Platform.OS === "ios" ? "100%" : "100%" },
        ]}
      >
        <TouchableOpacity
          onPress={onSearchPress}
          //   style={{
          //     marginLeft: chat ? 0 : 10,
          //     borderColor: '#8D8C92',
          //     backgroundColor: '#333333',
          //     borderWidth: 1,
          //     borderRadius: 4,
          //     height: 45,
          //     alignItems: 'center',
          //     justifyContent: 'center',
          //     width: 50,
          //   }}
        >
          <Icons
            name="search-outline"
            type="Ionicons"
            size={22}
            color={COLORS.gray}
          />
        </TouchableOpacity>
        <TextInput
          autoFocus={autoFocus}
          editable={editable}
          onFocus={onFocus}
          placeholder={placeHolder}
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          value={value}
          cursorColor={COLORS.black}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
        />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: 52,
    // borderWidth: 0.8,
  },
  input: {
    color: COLORS.black,
    fontSize: 15,
    fontFamily: fonts.regular,
    flex: 1,
    top: 2,
  },
});
