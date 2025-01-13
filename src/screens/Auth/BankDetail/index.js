import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import { get, put } from "../../../Services/ApiRequest";
import { setUserData } from "../../../store/reducer/usersSlice";
import { ToastMessage } from "../../../utils/ToastMessage";
import { className } from "../../../global-styles";
import { useSelector } from "react-redux";

const BankDetail = ({ navigation, route }) => {
  const { userData } = useSelector((state) => state.users);

  const init = {
    acc_title: userData?.acc_title || "",
    acc_numb: userData?.acc_numb || "",
    bank_name: userData?.bank_name || "",
  };
  const [state, setState] = useState(init);
  const inits = {
    acc_titleError: "",
    acc_numbError: "",
    bank_nameError: "",
  };

  const [errors, setErrors] = useState(inits);
  const [loading, setLoading] = useState(false);

  const array = [
    {
      id: 1,
      placeholder: "Account Title",
      label: "Account Title",
      value: state.acc_title,
      onChange: (text) => setState({ ...state, acc_title: text }),
      error: errors.acc_titleError,
    },
    {
      id: 2,
      placeholder: "Account Number",
      label: "Account Number",
      value: state.acc_numb,
      onChange: (text) => setState({ ...state, acc_numb: text }),
      error: errors.acc_numbError,
    },
    {
      id: 3,
      placeholder: "Bank Name",
      label: "Bank Name",
      value: state.bank_name,
      onChange: (text) => setState({ ...state, bank_name: text }),
      error: errors.bank_nameError,
    },
  ];
  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.acc_title)
        newErrors.acc_titleError = "Please enter account title";
      else if (!state.acc_numb)
        newErrors.acc_numbError = "Please enter account number";
      else if (!state.bank_name)
        newErrors.bank_nameError = "Please enter bank name";

      setErrors(newErrors);
    };
  }, [state]);
  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  const handleRegister = async () => {
    setLoading(true);
    const body = {
      acc_title: state.acc_title,
      acc_numb: state.acc_numb,
      bank_name: state.bank_name,
    };
    try {
      const response = await put("users/update-user", body);
      if (response.data.success) {
        getProfile();
        ToastMessage(response.data?.message);
        navigation.goBack();
      } else {
        ToastMessage(response.data?.message);
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const getProfile = async () => {
    try {
      const response = await get("users/me");
      dispatch(setUserData(response.data?.user));
    } catch (error) {}
  };
  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => <></>}
      headerUnScrollable={() => <Header title={"Account Details"} />}
    >
      <View style={className("mt-12")} />
      {array.map((item) => (
        <CustomInput
          key={item?.id}
          placeholder={item.placeholder}
          value={item.value}
          onChangeText={item.onChange}
          error={item.error}
          withLabel={item.label}
        />
      ))}
      <CustomButton
        title="Submit"
        marginTop={50}
        onPress={handleRegister}
        loading={loading}
        disabled={
          loading || !Object.values(errors).every((error) => error === "")
        }
      />
    </ScreenWrapper>
  );
};

export default BankDetail;

const styles = StyleSheet.create({});
