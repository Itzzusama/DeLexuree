import { StyleSheet, View, TextInput } from "react-native";
import React from "react";

import { Images } from "../../../../assets/images";
import { className } from "../../../../global-styles";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
const Search = () => {
  return (
    <View
      style={className(
        "bor-1 border-EF flex align-center justify-between rounded-2 px-4 my-3"
      )}
    >
      <TextInput
        placeholder="Search"
        placeholderTextColor={COLORS.gray2}
        style={{ fontFamily: fonts.regular, fontSize: 14, width: "75%" }}
      />
      <ImageFast source={Images.search} style={{ height: 20, width: 20 }} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
