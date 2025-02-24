import { StyleSheet, Dimensions, Animated, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";

import { setOnBoarding } from "../../../store/reducer/AuthConfig";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
  const flatListRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const array = [
    {
      id: 1,
      img: Images.onBoarding1,
    },
    {
      id: 2,
      img: Images.onBoarding2,
    },
    {
      id: 3,
      img: Images.onBoarding3,
    },
  ];
  useEffect(() => {
    flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
  }, [currentIndex]);

  return (
    <ScreenWrapper
      translucent
      statusBarColor="transparent"
      paddingHorizontal={0.1}
    >
      <Animated.FlatList
        data={array}
        showsHorizontalScrollIndicator={false}
        horizontal
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          console.error("Failed to scroll to index:", info.index);
        }}
        ref={flatListRef}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex((x / width)?.toFixed(0));
        }}
        initialScrollIndex={currentIndex}
        pagingEnabled
        renderItem={({ item }) => (
          <Animated.View style={styles.sliderItem}>
            <Animated.Image
              style={styles.img}
              source={item.img}
              resizeMode={"cover"}
            />
          </Animated.View>
        )}
      />
      <View style={styles.container}>
        <CustomText
          label={
            currentIndex == 0
              ? "onBoarding1"
              : currentIndex == 1
              ? "onBoarding2"
              : "onBoarding3"
          }
          fontSize={24}
          marginBottom={6}
          textAlign="center"
          lineHeight={34}
          fontFamily={fonts.bold}
        />
        <CustomText
          label={
            currentIndex == 0
              ? "onBoarding1Desc"
              : currentIndex == 1
              ? "onBoarding2Desc"
              : "onBoarding3Desc"
          }
          fontSize={14}
          marginBottom={10}
          textAlign="center"
          lineHeight={22}
          fontFamily={fonts.medium}
        />
      </View>
      <View style={{ padding: 20 }}>
        <Animated.View style={styles.dotContainer}>
          {array?.map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i == currentIndex ? "#5C7D72" : COLORS.lightGray,
                },
              ]}
            />
          ))}
        </Animated.View>
        <CustomButton
          marginBottom={10}
          title={currentIndex == 2 ? "Get Started" : "Next"}
          onPress={
            currentIndex == 2
              ? async () => {
                  navigation.replace("GetStarted");
                  dispatch(setOnBoarding(true));
                }
              : async () => {
                  setCurrentIndex((pre) => parseInt(pre) + 1);
                }
          }
        />
      </View>
    </ScreenWrapper>
  );
};
export default OnBoarding;
const styles = StyleSheet.create({
  sliderItem: {
    width: width,
    height: height / 1.4,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: "100%",
    width: "100%",
    // resizeMode: "cover",
  },
  dot: {
    height: 10,
    width: 10,
    marginHorizontal: 3,
    borderRadius: 100,
  },
  container: {
    width: width,
    height: height / 2.6,
    alignItems: "center",
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    padding: 25,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
  },
});
