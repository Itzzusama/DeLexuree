import { StyleSheet, View } from "react-native";
import React from "react";

import ScreenWrapper from "../../../../components/ScreenWrapper";
import CustomText from "../../../../components/CustomText";
import CustomHeader from "../../../../components/CustomHeader";
import { COLORS } from "../../../../utils/COLORS";
import { className } from "../../../../global-styles";
import TextContentCard from "../../../../components/TextContentCard";
const TermsCondition = () => {
  return (
    <ScreenWrapper backgroundColor={COLORS.F0} paddingHorizontal={"0%"}>
      <View style={className("bg-white px-5 py-3")}>
        <CustomHeader lable="Terms & Conditions" />
      </View>
      <View style={className("bg-white mt-1.5")}>
        <TextContentCard
          title={"Lorem ipsum dolor sit amet"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies mi enim, quis vulputate nibh faucibus at. Maecenas est ante, suscipit vel sem non, blandit blandit erat. Praesent pulvinar ante et felis porta vulputate. Curabitur ornare velit nec fringilla finibus. Phasellus mollis pharetra ante, in ullamcorper massa ullamcorper et. Curabitur ac leo sit amet leo interdum mattis vel eu mauris."
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({});
