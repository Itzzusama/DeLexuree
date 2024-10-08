import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { Images } from "../../../../assets/images";
import fonts from "../../../../assets/fonts";
import { formatTime } from "../../../../utils/dateUtils";
import { COLORS } from "../../../../utils/COLORS";

const ChatBubble = ({ isSender, item, recImg, senderImg }) => {
  return (
    <View
      style={{
        flexDirection: isSender ? "row-reverse" : "row",
        alignSelf: isSender ? "flex-end" : "flex-start",
        marginTop: 20,
      }}
    >
      <Image
        source={
          isSender
            ? senderImg
              ? { uri: senderImg }
              : Images.user
            : recImg
            ? { uri: recImg }
            : Images.user
        }
        style={[
          styles.avatar,
          {
            marginRight: isSender ? 0 : 10,
            marginLeft: isSender ? 10 : 0,
          },
        ]}
      />

      <View
        style={[
          styles.messageContainer,
          { backgroundColor: isSender ? COLORS.primaryColor : "#EDEEEF" },
        ]}
      >
        <CustomText
          label={item?.message}
          color={isSender ? COLORS.white : COLORS.blk2}
          fontSize={13}
          textAlign={isSender ? "right" : "left"}
        />
        <View
          style={{
            flexDirection: isSender ? "row-reverse" : "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <CustomText
            label={isSender ? "You" : "Customer"}
            color={isSender ? COLORS.white : COLORS.blk2}
            fontSize={13}
            fontFamily={fonts.bold}
          />
          <CustomText
            label={" - "}
            color={isSender ? COLORS.white : COLORS.blk2}
            fontSize={8}
          />
          <CustomText
            label={formatTime(item?.createdAt)}
            color={isSender ? COLORS.white : COLORS.blk2}
            fontSize={8}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "70%",
    padding: 15,
    borderRadius: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
