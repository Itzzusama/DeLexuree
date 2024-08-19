import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import CustomHeader from "../../../../components/CustomHeader";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import { className } from "../../../../global-styles";
import Search from "./Search";
import Accordion from "./Accordian";
import { get, post } from "../../../../Services/ApiRequest";
import Header from "../../../../components/Header";
import { regEmail } from "../../../../utils/constants";
import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";
import { ToastMessage } from "../../../../utils/ToastMessage";
const HelpCenter = ({ navigation }) => {
  const init = {
    name: "",
    email: "",
    msg: "",
  };

  const inits = {
    nameError: "",
    emailError: "",
    msgError: "",
  };

  const [state, setState] = useState(init);
  const [errors, setErrors] = useState(inits);
  const array = [
    {
      id: 1,
      placeholder: "Enter your name",
      value: state.name,
      label: "Name",
      onChange: (text) => setState({ ...state, name: text }),
      error: errors?.nameError,
    },
    {
      id: 2,
      placeholder: "Enter your email",
      value: state.email,
      label: "Email",
      onChange: (text) => setState({ ...state, email: text }),
      error: errors?.emailError,
    },
    {
      id: 3,
      placeholder: "Enter your message",
      value: state.msg,
      label: "Message",
      onChange: (text) => setState({ ...state, msg: text }),
      error: errors?.msgError,
    },
  ];

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.name) newErrors.nameError = "Please enter Name";
      else if (!state.email)
        newErrors.emailError = "Please enter Email address";
      else if (!regEmail.test(state.email))
        newErrors.emailError = "Please enter valid email";
      else if (!state.msg) newErrors.msgError = "Please enter Message";

      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const body = {
        name: state.name,
        email: state.email,
        msg: state.msg,
      };
      console.log(body);
      const res = await post("support/create", body);
      if (res.data.success) {
        ToastMessage("Submitted successfully!");
        navigation.goBack();
      } else {
        ToastMessage("Couldn't Submit, please try again");
      }
    } catch (err) {
      ToastMessage("Couldn't Submit, please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      backgroundColor={COLORS.white}
      headerUnScrollable={() => <Header title={"Help Center"} />}
      footerUnScrollable={() => (
        <CustomButton
          title={"Submit"}
          customStyle={className("mx-6 w-90 mb-6")}
          onPress={handleSubmit}
          loading={loading}
          disabled={
            loading || !Object.values(errors).every((error) => error === "")
          }
        />
      )}
    >
      <View style={className("mt-5")}>
        {array.map((item) => (
          <CustomInput
            key={item?.id}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            error={item.error}
            withLabel={item.label}
            multiline={item.id == 3}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({});
