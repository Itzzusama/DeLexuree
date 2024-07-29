import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { post } from "../../../Services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import CountryPhoneInput from "../../../components/CountryPhoneInput";
import Header from "../../../components/Header";
import { regEmail } from "../../../utils/constants";

const ForgetPass = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = "";
      if (!email) newErrors = "Please enter Email address";
      else if (!regEmail.test(email)) newErrors = "Please enter valid email";
      setEmailError(newErrors);
    };
  }, [email]);

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      const body = {
        phone: phone,
      };
      const response = await post("users/forget-password", body);
      console.log("res-------------", response.data);
      if (response.data?.success) {
        navigation.navigate("OTPScreen", {
          isAccountCreated: true,
          token: response.data?.token,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header />}
      footerUnScrollable={() => (
        <CustomButton
          title="Send OTP"
          marginTop={20}
          width="90%"
          marginBottom={30}
          loading={loading}
          // onPress={handleSendOTP}
          onPress={() =>
            navigation.navigate("OTPScreen", {
              isAccountCreated: true,
              // token: response.data?.token || "",
              token: "",
            })
          }
          disabled={!!emailError || loading}
        />
      )}
    >
      <AuthWrapper heading="Forgot Password?" desc="forgotPassDesc">
        {/* <CountryPhoneInput
          setValue={setPhone}
          value={phone}
          error={phoneError.phoneError}
        /> */}
        <CustomInput
          placeholder={"Enter email here"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={emailError}
          withLabel={"Email"}
        />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default ForgetPass;
