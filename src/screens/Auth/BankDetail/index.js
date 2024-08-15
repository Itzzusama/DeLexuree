import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";

const BankDetail = ({ navigation, route }) => {
  const init = {
    acc_title: "",
    acc_numb: "",
    bank_name: "",
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

  const handleRegister = () => {
    const body = {
      ...route.params.body,
      acc_title: state.acc_title,
      acc_numb: state.acc_numb,
      bank_name: state.bank_name,
    };
    console.log(body);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Information",
          params: { body },
        },
      ],
    });
  };
  return (
    <ScreenWrapper scrollEnabled footerUnScrollable={() => <></>}>
      <AuthWrapper
        heading="Create Account"
        desc="Enter Bank Detail"
        showStatus={true}
        index={1}
      >
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
          title="Continue"
          marginTop={50}
          onPress={handleRegister}
          disabled={!Object.values(errors).every((error) => error === "")}
        />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default BankDetail;

const styles = StyleSheet.create({});
