import {
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import ScreenWrapper from "../../../../components/ScreenWrapper";
import CustomText from "../../../../components/CustomText";
import CustomDropDown from "../../../../components/CustomDropDown";
import { COLORS } from "../../../../utils/COLORS";
import { className } from "../../../../global-styles";
import CustomButton from "../../../../components/CustomButton";
import DatePicker from "react-native-date-picker";

import CustomInput from "../../../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../../assets/images";
import ImageFast from "../../../../components/ImageFast";
import fonts from "../../../../assets/fonts";
import { get, put } from "../../../../Services/ApiRequest";
import { ToastMessage } from "../../../../utils/ToastMessage";
import { setUserData } from "../../../../store/reducer/usersSlice";
import UploadImage from "../../../../components/UploadImage";

import { Image as ImageCompressor } from "react-native-compressor";

import storage from "@react-native-firebase/storage";
import Header from "../../../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoints } from "../../../../Services/ENV";
import axios from "axios";

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(userData?.profilePicture);
  const [gender, setGender] = useState(userData?.gender);
  const init = {
    fName: userData?.name,
    email: userData?.email,
    phone: userData?.phone,
  };

  const [state, setState] = useState(init);
  const [birthdate, setBirthdate] = useState(
    userData?.dob ? new Date(userData?.dob) : new Date()
  );
  const [open, setOpen] = useState(false);
  const formattedDate = moment(birthdate).format("DD-MM-YYYY");

  const handleUpdateUser = async () => {
    setLoading(true);
    if (!state.fName) {
      ToastMessage("Please enter your name");
      setLoading(false);
      return;
    }
    // if (!state.acc_title) {
    //   ToastMessage("Please enter account title");
    //   setLoading(false);
    //   return;
    // }
    // if (!state.acc_number) {
    //   ToastMessage("Please enter account number");
    //   setLoading(false);
    //   return;
    // }
    // if (!state.bank_name) {
    //   ToastMessage("Please enter bank name");
    //   setLoading(false);
    //   return;
    // }
    try {
      const body = {
        dob: birthdate,
        email: state.email,
        name: state.fName,
        phone: state.phone,
        // acc_title: state.acc_title,
        // acc_numb: state.acc_number,
        // bank_name: state.bank_name,
        gender: gender,
        profilePicture: image,
      };
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
  const array = [
    {
      id: 1,
      placeholder: "Enter Full Name",
      label: "Full Name",
      value: state.fName,
      onChange: (text) => setState({ ...state, fName: text }),
    },

    {
      id: 2,
      placeholder: "Email Address",
      label: "Email Address",
      value: state.email,
      onChange: (text) => setState({ ...state, email: text }),
    },
    {
      id: 3,
      placeholder: "Phone Number",
      label: "Phone Number",
      value: state.phone,
      onChange: (text) => setState({ ...state, phone: text }),
    },

    { id: 3.1 },
    { id: 3.2 },
  ];

  const uploadAndGetUrl = async (file) => {
    console.log("this is", file);
    setImageLoading(true);
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: file?.path || file?.fileCopyUri || "",
        type: "image/jpeg",
        name: "photo.jpg",
      });
      const res = await axios.post(
        `${endPoints.BASE_URL}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      setImage(res?.data?.image);
      return res?.data?.image;
    } catch (err) {
      ToastMessage("Upload Again");
    } finally {
      setImageLoading(false);
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
      backgroundColor={COLORS.white}
      scrollEnabled
      paddingHorizontal={"0%"}
      headerUnScrollable={() => <Header title={"Edit Profile"} />}
    >
      {imageLoading ? (
        <ActivityIndicator size={"small"} />
      ) : (
        <UploadImage
          handleChange={async (res) => {
            const url = await uploadAndGetUrl(res);
            // setImage(url);
          }}
          renderButton={(res) => (
            <View style={className("align-center justify-center")}>
              <Pressable
                onPress={res}
                style={className("align-center justify-center mt-7 ")}
              >
                <ImageFast
                  source={image ? { uri: image } : Images.sampleProfile}
                  style={{ height: 90, width: 90, borderRadius: 50 }}
                />
                <CustomText
                  label={"Change Profile Picture"}
                  fontSize={14}
                  fontFamily={fonts.semiBold}
                />
              </Pressable>
            </View>
          )}
        />
      )}

      <View style={className("px-5 pt-4 flex-1")}>
        {array.map((item) =>
          item.id == 3.1 ? (
            <View>
              <CustomText
                label={"Date of Birth"}
                marginBottom={5}
                fontSize={14}
                fontFamily={fonts.semiBold}
              />
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  justifyContent: "center",
                  height: 55,
                  marginBottom: 18,
                  paddingHorizontal: 15,
                  borderRadius: 4,
                  backgroundColor: COLORS.white,
                  borderWidth: 0.2,
                  borderColor: COLORS.gray,
                }}
              >
                <CustomText
                  label={formattedDate ? formattedDate : " Date Of Birth"}
                  fontSize={14}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                mode="date"
                maximumDate={new Date()}
                date={birthdate}
                onConfirm={(date) => {
                  setOpen(false);
                  setBirthdate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          ) : item.id == 3.2 ? (
            <>
              <CustomText
                label={"Gender"}
                marginBottom={5}
                fontSize={14}
                fontFamily={fonts.semiBold}
              />
              <CustomDropDown
                placeholder={"Select your Gender"}
                value={gender}
                setValue={setGender}
                options={["male", "female"]}
              />
            </>
          ) : (
            <CustomInput
              key={item?.id}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={item.onChange}
              editable={item?.id == 3 || item?.id == 2}
              withLabel={item?.label}
            />
          )
        )}
      </View>
      <View style={className("px-5 mb-6 mt-6")}>
        <CustomButton
          title="Save"
          loading={loading || imageLoading}
          onPress={handleUpdateUser}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
