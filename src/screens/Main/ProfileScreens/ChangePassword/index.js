import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../../../../components/CustomButton";
import CustomHeader from "../../../../components/CustomHeader";
import CustomInput from "../../../../components/CustomInput";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { className } from "../../../../global-styles";
import { COLORS } from "../../../../utils/COLORS";
import { put } from "../../../../Services/ApiRequest";
import { passwordRegex } from "../../../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { ToastMessage } from "../../../../utils/ToastMessage";
import Header from "../../../../components/Header";

const ChangePassword = () => {
  const navigation = useNavigation();
  const [isSecureText, setIsSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const init = {
    password: "",
    newPassword: "",
    conPassword: "",
  };
  const inits = {
    passwordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  };
  const [state, setState] = useState(init);
  const [errors, setErrors] = useState(inits);

  const updatePassword = async () => {
    setLoading(true);
    const body = {
      oldPassword: state.password,
      newPassword: state.newPassword,
    };
    try {
      const response = await put("users/change-password", body);
      console.log("this is res------, ", response.data);
      if (response.data.success) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "AuthStack",
            },
          ],
        });
      }
      ToastMessage(response.data?.message);
      // Handle response as needed
    } catch (error) {
      console.log("err--", error.response.data.message);
      ToastMessage(error.response.data?.message);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const array = [
    {
      id: 1,
      placeholder: "Enter Password",
      value: state.password,
      onChange: (text) => setState({ ...state, password: text }),
      error: errors?.passwordError,
    },
    {
      id: 2,
      placeholder: "Enter New Password",
      value: state.newPassword,
      onChange: (text) => setState({ ...state, newPassword: text }),
      error: errors?.newPasswordError,
    },
    {
      id: 3,
      placeholder: "Enter Confirm Password",
      value: state.conPassword,
      onChange: (text) => setState({ ...state, conPassword: text }),
      error: errors?.confirmPasswordError,
    },
  ];

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.password) newErrors.passwordError = "Enter Password";
      else if (!passwordRegex.test(state.password))
        newErrors.passwordError =
          "Password must contain 1 number, 1 special character, Uppercase and 8 digits";
      if (!state.newPassword) newErrors.newPasswordError = "Enter New Password";
      else if (!passwordRegex.test(state.newPassword))
        newErrors.newPasswordError =
          "Password must contain 1 number, 1 special character, Uppercase and 8 digits";
      if (!state.conPassword)
        newErrors.confirmPasswordError = "Enter Confirm Password";
      else if (!passwordRegex.test(state.conPassword))
        newErrors.confirmPasswordError =
          "Password must contain 1 number, 1 special character, Uppercase and 8 digits";
      else if (state.newPassword !== state.conPassword)
        newErrors.confirmPasswordError = "Passwords do not match";
      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  return (
    <ScreenWrapper
      backgroundColor={COLORS.white}
      paddingHorizontal={"0%"}
      headerUnScrollable={() => <Header title="Change Password" />}
    >
      <View style={className("mx-5 flex-1 mt-7")}>
        {array.map((item) => (
          <CustomInput
            key={item.id}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            secureTextEntry={isSecureText}
            setIsSecureText={setIsSecureText}
            password
            error={item.error}
          />
        ))}
      </View>
      <View style={className("px-5 mb-6")}>
        <CustomButton
          disabled={!Object.values(errors).every((error) => error === "")}
          title="Change Password"
          onPress={updatePassword}
          loading={loading}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
