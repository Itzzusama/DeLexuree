import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  View,
  Image,
  Text,
  LayoutAnimation,
  UIManager,
} from "react-native";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomDropDown = ({
  options,
  value,
  setValue,
  placeholder,
  icon,
  withLabel,
  isRequired,
  maxHeight,
  error,
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-1000)).current;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (multiSelect) {
      if (value.includes(option)) {
        setValue(value.filter((item) => item !== option));
      } else {
        setValue([...value, option]);
      }
    } else {
      setValue(option);
      toggleDropdown();
    }
  };

  const isSelected = (option) => {
    return multiSelect ? value.includes(option) : value === option;
  };

  return (
    <>
      {withLabel ? (
        <Text style={styles.withLabelStyle}>
          {withLabel}
          {isRequired && <Text style={{ color: COLORS.red }}> *</Text>}
        </Text>
      ) : null}
      <View style={[styles.dropdownMainContainer, { height: !isOpen? 49 : 130 }]}>
        <TouchableOpacity
          style={[styles.mainContainer, { marginBottom: isOpen ? 5 : 20 }]}
          onPress={toggleDropdown}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {icon && <Image source={icon} style={styles.leftIcon} />}
            <CustomText
              textTransform={"capitalize"}
              label={
                multiSelect
                  ? value.length > 0
                    ? value?.join(", ")
                    : placeholder
                  : value || placeholder
              }
              color={value?.length > 0 ? COLORS.black : COLORS.gray}
              marginLeft={10}
            />
          </View>
          <Icons
            family="Entypo"
            size={20}
            color={COLORS.black}
            name={isOpen ? "chevron-up" : "chevron-down"}
          />
        </TouchableOpacity>

        {isOpen && (
          <ScrollView nestedScrollEnabled
          style={{ maxHeight:450 }}>
            {options?.map((option) => (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.listItemContainer}
                key={option}
                onPress={() => handleSelect(option)}
              >
                <CustomText
                  fontSize={12}
                  fontFamily={fonts.medium}
                  label={option}
                  textTransform={"capitalize"}
                />
                {isSelected(option) && (
                  <Icons
                    family="FontAwesome"
                    size={16}
                    color={COLORS.green}
                    name="check"
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      {error && (
        <CustomText label={error} color={COLORS.red} marginBottom={20} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dropdownMainContainer: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    width: "100%",
    // maxHeight: 200,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
    height: 40,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    maxHeight: 150,
  },
  dropdown: {
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 6,
    elevation: 3,
    zIndex: 2,
    marginBottom: 20,
  },
  listItemContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftIcon: {
    width: 17,
    height: 17,
    resizeMode: "contain",
  },
  withLabelStyle: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.black,
    marginBottom: 5,
  },
  checkIcon: {
    marginLeft: 10,
  },
});

export default CustomDropDown;
