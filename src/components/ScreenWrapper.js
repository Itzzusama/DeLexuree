import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import ImageFast from "./ImageFast";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";

const { width, height } = Dimensions.get("window");

const FocusAwareStatusBar = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      barStyle="dark-content"
      backgroundColor={COLORS.white}
      {...props}
    />
  ) : null;
};

const ScreenWrapper = ({
  children,
  statusBarColor = COLORS.white,
  translucent = false,
  scrollEnabled = false,
  backgroundImage,
  backgroundColor = COLORS.white,
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  barStyle = "dark-content",
  refreshControl,
  paddingBottom,
  nestedScrollEnabled,
  paddingHorizontal,
  isAuth,
}) => {
  const navigation = useNavigation();

  const content = () => {
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: paddingBottom,
            backgroundColor: backgroundImage ? "transparent" : backgroundColor,
          },
        ]}
      >
        <FocusAwareStatusBar
          barStyle={barStyle}
          backgroundColor={statusBarColor}
          translucent={translucent}
        />
        {!translucent && (
          <SafeAreaView
            style={(styles.container, { backgroundColor: statusBarColor })}
          />
        )}
        {headerUnScrollable()}
        {isAuth && (
          <View style={{ padding: 15 }}>
            <Icons
              name="chevron-left"
              family="Entypo"
              color={COLORS.black}
              size={28}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate("AuthStack", { screen: "OptionScreen" });
                }
              }}
            />
          </View>
        )}

        {scrollEnabled ? (
          <KeyboardAwareScrollView
            nestedScrollEnabled={nestedScrollEnabled}
            refreshControl={refreshControl}
            style={[
              styles.container,
              { backgroundColor, paddingHorizontal: paddingHorizontal || 25 },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <View style={{ paddingHorizontal: paddingHorizontal || 25, flex: 1 }}>
            {children}
          </View>
        )}
        {footerUnScrollable()}
      </View>
    );
  };
  return backgroundImage ? (
    <View style={{ width, height, zIndex: 999 }}>
      {content()}
      <ImageFast
        source={backgroundImage}
        style={{ width, height, position: "absolute", zIndex: -1 }}
        resizeMode="cover"
      />
    </View>
  ) : (
    content()
  );
};

export default ScreenWrapper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
