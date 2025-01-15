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

import { post, put } from "../../../Services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import { COLORS } from "../../../utils/COLORS";
import Gallery from "../../../components/Gallery";
import { useSelector } from "react-redux";
import { className } from "../../../global-styles";
import InformationItem from "./molecules/InformationItem";
import Header from "../../../components/Header";
import MultipleChoiceItem from "./molecules/MultipleChoiceItem";

const Information = ({ navigation, route }) => {
  const { userCategory } = useSelector((state) => state.authConfigs);

  const init = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    mcq1: "",
    mcq2: "",
    mcq3: "",
    mcq4: "",
    mcq5: "",
  };

  const inits = {
    q1Error: "",
    q2Error: "",
    q3Error: "",
    q4Error: "",
    q5Error: "",
    q6Error: "",
    q7Error: "",
    q8Error: "",
    q9Error: "",
    q10Error: "",
    mcq1Error: "",
    mcq2Error: "",
    mcq3Error: "",
    mcq4Error: "",
    mcq5Error: "",
  };

  const [state, setState] = useState(init);
  const [errors, setErrors] = useState(inits);
  const [loading, setLoading] = useState(false);
  const [user_type, setUser_type] = useState("Public");
  const [hasDBSCertificate, setHasDBSCertificate] = useState(false);

  const array = [
    {
      id: 1,
      question:
        "1. Describe the steps you would take to thoroughly clean a client’s bathroom from top to bottom.",
      placeholder: "Please enter information",
      value: state.q1,
      onChange: (text) => setState({ ...state, q1: text }),
      error: errors.q1Error,
    },
    {
      id: 2,
      question:
        "2. If you arrive at a home and the client asks for an additional service that was not included in the booking, how would you handle this request?",
      placeholder: "Please enter information",
      value: state.q2,
      onChange: (text) => setState({ ...state, q2: text }),
      error: errors.q2Error,
    },
    {
      id: 3,
      question:
        "3. A client complains about streaks on their glass and mirrors after you’ve cleaned them. How would you ensure streak-free results in the future?",
      placeholder: "Please enter information",
      value: state.q3,
      onChange: (text) => setState({ ...state, q3: text }),
      error: errors.q3Error,
    },
    {
      id: 4,
      question:
        "4. Explain your process for ensuring all areas of a kitchen are deep-cleaned, including less obvious spots like handles, light switches, and appliance exteriors.",
      placeholder: "Please enter information",
      value: state.q4,
      onChange: (text) => setState({ ...state, q4: text }),
      error: errors.q4Error,
    },
    {
      id: 5,
      question:
        "5. Imagine you’re asked to do a last-minute cleaning for a client expecting guests in an hour. Which areas would you prioritize, and how would you work efficiently?",
      placeholder: "Please enter information",
      value: state.q5,
      onChange: (text) => setState({ ...state, q5: text }),
      error: errors.q5Error,
    },
    {
      id: 6,
      question:
        "6. What motivates you to do a thorough job when cleaning a client’s home?",
      placeholder: "Please enter information",
      value: state.q6,
      onChange: (text) => setState({ ...state, q6: text }),
      error: errors.q6Error,
    },
    {
      id: 7,
      question:
        "7. Describe a situation where you went above and beyond for a client. How did they react?",
      placeholder: "Please enter information",
      value: state.q7,
      onChange: (text) => setState({ ...state, q7: text }),
      error: errors.q7Error,
    },
    {
      id: 8,
      question:
        "8. How do you handle situations where a client has very specific cleaning preferences or instructions?",
      placeholder: "Please enter information",
      value: state.q8,
      onChange: (text) => setState({ ...state, q8: text }),
      error: errors.q8Error,
    },
    {
      id: 9,
      question:
        "9. What do you find most rewarding about working in the cleaning industry?",
      placeholder: "Please enter information",
      value: state.q9,
      onChange: (text) => setState({ ...state, q9: text }),
      error: errors.q9Error,
    },
    {
      id: 10,
      question:
        "10. If you ever encounter a client who is not fully satisfied with your work, how would you approach the situation?",
      placeholder: "Please enter information",
      value: state.q10,
      onChange: (text) => setState({ ...state, q10: text }),
      error: errors.q10Error,
    },
  ];

  const multipleChoiceArray = [
    {
      id: 1,
      question:
        "1. If a client requests a deep clean for their kitchen, which of the following tasks should be prioritized?",
      options: [
        "A) Wiping down the countertops only",
        "B) Cleaning the floor only",
        "C) Scrubbing all surfaces, including the inside of appliances",
        "D) Dusting shelves only",
      ],
      value: "",
      onChange: (value) => setState({ ...state, mcq1: value }),
    },
    {
      id: 2,
      question: "2. What is the best method for cleaning hardwood floors?",
      options: [
        "A) Soaking them with water and scrubbing",
        "B) Using a gentle cleaner with a damp mop",
        "C) Using a harsh chemical cleaner",
        "D) Sweeping only",
      ],
      value: "",
      onChange: (value) => setState({ ...state, mcq2: value }),
    },
    {
      id: 3,
      question:
        "3. If you notice a small stain on a client’s sofa during a general cleaning, what should you do?",
      options: [
        "A) Ignore it, as it’s not part of the task",
        "B) Attempt to remove it if it won’t damage the fabric",
        "C) Report it to the client and ask if they’d like it cleaned",
        "D) Clean it without informing the client",
      ],
      value: "",
      onChange: (value) => setState({ ...state, mcq3: value }),
    },
    {
      id: 4,
      question:
        "4. A client requests that no strong-smelling products be used. Which of the following would be the best product choice?",
      options: [
        "A) Bleach",
        "B) Ammonia-based cleaner",
        "C) Eco-friendly, unscented cleaner",
        "D) Fragrant multipurpose cleaner",
      ],
      value: "",
      onChange: (value) => setState({ ...state, mcq4: value }),
    },
    {
      id: 5,
      question:
        "5. If you’re cleaning and you accidentally knock over and break a small decor item, what should you do?",
      options: [
        "A) Leave it and say nothing",
        "B) Attempt to fix it yourself",
        "C) Inform the client and offer to cover the damage",
        "D) Hide the item",
      ],
      value: "",
      onChange: (value) => setState({ ...state, mcq5: value }),
    },
  ];

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};

      if (!state.q1) newErrors.q1Error = "Please enter Information";
      else if (!state.q2) newErrors.q2Error = "Please enter Information";
      else if (!state.q3) newErrors.q3Error = "Please enter Information";
      else if (!state.q4) newErrors.q4Error = "Please enter Information";
      else if (!state.q5) newErrors.q5Error = "Please enter Information";
      else if (!state.q6) newErrors.q6Error = "Please enter Information";
      else if (!state.q7) newErrors.q7Error = "Please enter Information";
      else if (!state.q8) newErrors.q8Error = "Please enter Information";
      else if (!state.q9) newErrors.q9Error = "Please enter Information";
      else if (!state.q10) newErrors.q10Error = "Please enter Information";
      else if (!state.mcq1) newErrors.q1Error = "Please select Option";
      else if (!state.mcq2) newErrors.q2Error = "Please select Option";
      else if (!state.mcq3) newErrors.q3Error = "Please select Option";
      else if (!state.mcq4) newErrors.q4Error = "Please select Option";
      else if (!state.mcq5) newErrors.q5Error = "Please select Option";

      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  const handlePress = async () => {
    const body = {
      ...route.params.body,
      ques_forms: {
        bathroomSteps: state.q1,
        additionalService: state.q2,
        streakFreeGlass: state.q3,
        kitchenCleaning: state.q4,
        lastMinutePriorities: state.q5,
        cleaningMotivation: state.q6,
        goingAboveBeyond: state.q7,
        cleaningPreferences: state.q8,
        rewardingWork: state.q9,
        clientSatisfaction: state.q10,

        mcqKitchenPriorities: state.mcq1,
        mcqFloorCleaning: state.mcq2,
        mcqSofaStain: state.mcq3,
        mcqNoSmellCleaner: state.mcq4,
        mcqDamageHandling: state.mcq5,
      },
    };

    navigation.navigate("Availability", { showSkip: true, body: body });
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header hideBackArrow />}
      footerUnScrollable={() => (
        <>
          <CustomButton
            title="Continue"
            width="90%"
            onPress={handlePress}
            disabled={!Object.values(errors).every((error) => error === "")}
            loading={loading}
            customStyle={{ marginBottom: 30 }}
          />
        </>
      )}
    >
      <AuthWrapper
        heading="Tell us a bit about yourself!"
        desc="Tell us a bit about yourself to get started on your journey!"
        marginBottom={10}
        showStatus={true}
        index={2}
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
        {multipleChoiceArray.map((item) => (
          <MultipleChoiceItem
            key={item.id}
            question={item.question}
            options={item.options}
            value={state[`mcq${item.id}`]}
            onChange={(value) =>
              setState({ ...state, [`mcq${item.id}`]: value })
            }
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
