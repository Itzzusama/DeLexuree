import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";

import fonts from "../../../assets/fonts";

import { post } from "../../../Services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import { COLORS } from "../../../utils/COLORS";
import Gallery from "../../../components/Gallery";
import { useSelector } from "react-redux";
import { className } from "../../../global-styles";
import InformationItem from "./molecules/InformationItem";
const Information = ({ navigation, route }) => {
  const user = route?.params?.user;
  const dob = route?.params?.dob;
  const { userCategory } = useSelector((state) => state.authConfigs);

  const init = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
  };

  const inits = {
    q1Error: "",
    q2Error: "",
    q3Error: "",
    q4Error: "",
    q5Error: "",
    q6Error: "",
  };

  const [state, setState] = useState(init);
  const [errors, setErrors] = useState(inits);
  const [loading, setLoading] = useState(false);
  const [user_type, setUser_type] = useState("Public");
  const [hasDBSCertificate, setHasDBSCertificate] = useState(false);

  const array = [
    {
      id: 1,
      question: "1.How many years have you been in the cleaning business?",
      placeholder: "Please enter information",
      value: state.q1,
      onChange: (text) => setState({ ...state, q1: text }),
      error: errors.q1Error,
    },
    {
      id: 2,
      question:
        "2.What types of properties or spaces do you specialize in cleaning?",
      placeholder: "Please enter information",
      value: state.q2,
      onChange: (text) => setState({ ...state, q2: text }),
      error: errors.q2Error,
    },
    {
      id: 3,
      question:
        "3.What cleaning services do you offer? Are there different packages or options available?",
      placeholder: "Please enter information",
      value: state.q3,
      onChange: (text) => setState({ ...state, q3: text }),
      error: errors.q3Error,
    },
    {
      id: 4,
      question: "4.How do you determine pricing for your services?",
      placeholder: "Please enter information",
      value: state.q4,
      onChange: (text) => setState({ ...state, q4: text }),
      error: errors.q4Error,
    },
    {
      id: 5,
      question:
        "5.How far in advance do clients need to book appointments with you?",
      placeholder: "Please enter information",
      value: state.q5,
      onChange: (text) => setState({ ...state, q5: text }),
      error: errors.q5Error,
    },
    {
      id: 6,
      question:
        "6.Do you offer any satisfaction guarantees or warranties for your cleaning services?",
      placeholder: "Please enter information",
      value: state.q6,
      onChange: (text) => setState({ ...state, q6: text }),
      error: errors.q6Error,
    },
  ];

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};

      if (!state.q1) newErrors.q1Error = "Please enter Information";
      if (!state.q2) newErrors.q2Error = "Please enter Information";
      if (!state.q3) newErrors.q3Error = "Please enter Information";
      if (!state.q4) newErrors.q4Error = "Please enter Information";
      if (!state.q5) newErrors.q5Error = "Please enter Information";
      if (!state.q6) newErrors.q6Error = "Please enter Information";

      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const body = {
        phone: user?.phone,
      };
      const response = await post("users/send-code", body);
      ToastMessage(response.data?.message);
      console.log("otp------------", response.data);
      if (response.data) {
        navigation.navigate("OTPScreen", {
          isAccountCreated: false,
          bodySignUp: user,
          extraData: state,
          DBS: hasDBSCertificate,
          dob: dob,
        });
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <>
          <CustomButton
            title="Create Account"
            width="90%"
            // onPress={handleSendOtp}
            onPress={() =>
              navigation.navigate("OTPScreen", {
                isAccountCreated: false,
                bodySignUp: user,
                extraData: state,
                dob: dob,
              })
            }
            disabled={!Object.values(errors).every((error) => error === "")}
            loading={loading}
          />
          <CustomText
            label="I already have an account"
            fontSize={16}
            fontFamily={fonts.semiBold}
            alignSelf="center"
            marginTop={20}
            marginBottom={30}
            onPress={() => navigation.navigate("Login")}
          />
        </>
      )}
    >
      <AuthWrapper
        heading="Tell us a bit about yourself!"
        desc="Tell us a bit about yourself to get started on your journey!"
        marginBottom={10}
        showStatus={true}
        index={1}
      >
        {array.map((item) => (
          <InformationItem
            key={item?.id}
            question={item.question}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            error={item.error}
          />
        ))}
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  DBScontainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});