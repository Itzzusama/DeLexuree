import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../../../components/CustomHeader";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import { className } from "../../../../global-styles";
import Search from "./Search";
import Accordion from "./Accordian";
import { get } from "../../../../Services/ApiRequest";
import Header from "../../../../components/Header";
const HelpCenter = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFaqs = async () => {
    setLoading(true);
    try {
      const response = await get("users/faqs/all/1");
      setFaqs(response.data?.faqs);
      // console.log('res', response.data?.faqs);
    } catch (error) {
      console.log(error.response.data?.nessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFaqs();
  }, []);

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <ScreenWrapper
      scrollEnabled
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getFaqs} />
      }
      backgroundColor={COLORS.white}
      paddingHorizontal={"0%"}
      headerUnScrollable={() => <Header title={"Help Center"} />}
    >
      <View style={className("bg-white mt-1.5")}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            title={faq?.title}
            content={stripHtmlTags(faq?.subtitle)}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({});
