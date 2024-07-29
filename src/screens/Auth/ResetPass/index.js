import { StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import ResetSuccessModal from "./molecules/ResetSuccessModal";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomInput from "../../../components/CustomInput";
import { passwordRegex } from "../../../utils/constants";
import { put } from "../../../Services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import Header from "../../../components/Header";

const ResetPass = ({ navigation, route }) => {
  const token = route?.params?.token;

  const init = {
    password: "",
    confirmPassword: "",
  };
  const inits = {
    passwordError: "",
    confirmPasswordError: "",
  };
  const [state, setState] = useState(init);
  const [errors, setErrors] = useState(inits);

  const [isResetModal, setResetModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const array = [
    {
      id: 1,
      placeholder: "Password",
      label: "New Password",
      value: state.password,
      onChange: (text) => setState({ ...state, password: text }),
      error: errors?.passwordError,
    },
    {
      id: 2,
      placeholder: "Confirm Password",
      value: state.confirmPassword,
      label: "Confirm Password",
      onChange: (text) => setState({ ...state, confirmPassword: text }),
      error: errors?.confirmPasswordError,
    },
  ];

  const handleSetNewPassword = async () => {
    try {
      setLoading(true);
      const body = {
        token: token,
        password: state.password,
      };
      const response = await put("users/update-password/", body);
      if (response.data?.success) {
        setResetModal(true);
      }
      console.log("res-------------", response.data);
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.password) newErrors.passwordError = "Enter New Password";
      else if (!passwordRegex.test(state.password))
        newErrors.passwordError =
          "Password must contain 1 number, 1 special character, Uppercase and 8 digits";
      else if (!state.confirmPassword)
        newErrors.confirmPasswordError = "Please enter Password";
      else if (!passwordRegex.test(state.confirmPassword))
        newErrors.confirmPasswordError =
          "Password must contain 1 number, 1 special character, Uppercase and 8 digits";
      else if (state.password !== state.confirmPassword)
        newErrors.confirmPasswordError = "Passwords do not match";
      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header />}
      footerUnScrollable={() => (
        <CustomButton
          title="Reset Password"
          marginBottom={30}
          width="90%"
          onPress={() => setResetModal(true)}
          // onPress={handleSetNewPassword}
          disabled={!Object.values(errors).every((error) => error === "")}
          loading={loading}
        />
      )}
    >
      <AuthWrapper
        heading="Create New Password"
        desc="Create a new password and confirm it to login next time."
      >
        <ResetSuccessModal
          isVisible={isResetModal}
          onDisable={() => {
            setResetModal(false);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Login",
                },
              ],
            });
          }}
        />
        {array.map((item) => (
          <CustomInput
            key={item?.id}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            error={item.error}
            secureTextEntry
            withLabel={item.label}
          />
        ))}
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default ResetPass;

const styles = StyleSheet.create({});
