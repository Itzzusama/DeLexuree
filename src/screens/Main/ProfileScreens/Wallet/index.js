import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";

const Wallet = ({ navigation }) => {
  const init = {
    subject: "",
    email: "",
    des: "",
  };
  const [state, setState] = useState(init);
  const inits = {
    subjectError: "",
    emailError: "",
    desError: "",
  };

  const [errors, setErrors] = useState(inits);

  const array = [
    {
      id: 1,
      placeholder: "Enter account title",
      label: "Account Title",
      value: state.subject,
      onChange: (text) => setState({ ...state, subject: text }),
      error: errors.subjectError,
    },
    {
      id: 2,
      placeholder: "Enter account number",
      label: "Account Number",
      value: state.email,
      onChange: (text) => setState({ ...state, email: text }),
      error: errors.emailError,
    },
    {
      id: 3,
      placeholder: "Enter your Bank Description (Required)",
      label: "Bank Details",
      value: state.des,
      onChange: (text) => setState({ ...state, des: text }),
      error: errors.desError,
    },
  ];
  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.subject) newErrors.subjectError = "Please enter Subject";
      else if (state.subject.length < 5)
        newErrors.subjectError = "Subject must be at least 5 characters";
      else if (!state.email) newErrors.emailError = "Please enter Email";
      else if (!regEmail.test(state.email))
        newErrors.emailError = "Please enter valid email";
      else if (!state.des) newErrors.desError = "Please enter Description";
      else if (state.des.length < 30)
        newErrors.desError = "Description must be at least 30 characters";
      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Wallet"} />}
      footerUnScrollable={() => (
        <CustomButton
          title={"Save Changes"}
          marginBottom={18}
          width="90%"
          onPress={() => navigation.goBack()}
        />
      )}
    >
      <View style={styles.walletCard}>
        <CustomText label={"Your Earning"} color={COLORS.white} />
        <CustomText
          label={"$1340.56"}
          fontSize={34}
          fontFamily={fonts.bold}
          color={COLORS.white}
        />
      </View>
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
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  walletCard: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    marginVertical: 16,
  },
});
