import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import jwt_decode from "jwt-decode";
import { ToastMessage } from "./ToastMessage";
import { post } from "../Services/ApiRequest";

GoogleSignin.configure({
  webClientId:
    "157599591616-dmlv0dbsrcc8cl71910fa01jh50pj8do.apps.googleusercontent.com", // From Firebase Console
});

export const signInWithGoogle = async (navigation, dispatch, setLoading) => {
  try {
    setLoading((prevState) => ({ ...prevState, google: true }));
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken
    );
    const userCredential = await auth().signInWithCredential(googleCredential);

    const email = userCredential.user.email;
    const fcmtoken = await AsyncStorage.getItem("fcmToken");
    const reqData = {
      email: email,
      fcmtoken: fcmtoken,
    };
    try {
      const response = await post("auth/social-login", reqData);
      if (response.data?.success) {
        await AsyncStorage.setItem("token", response.data?.token);
        dispatch(setToken(response.data?.token));
        dispatch(setUserData(response.data?.user));
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainStack",
            },
          ],
        });
      } else {
        ToastMessage("Invalid credentials");
        await GoogleSignin.signOut();
      }
    } catch (err) {
      await GoogleSignin.signOut();
      ToastMessage("User has not registered with this account");
    }
  } catch (error) {
    await GoogleSignin.signOut();
    handleSignInError(error);
  } finally {
    setLoading((prevState) => ({ ...prevState, google: false }));
  }
};

export const signInWithApple = async (navigation, dispatch, setLoading) => {
  try {
    setLoading((prevState) => ({ ...prevState, apple: true }));
    const appleData = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log(appleData.identityToken);
    if (!appleData.identityToken)
      return ToastMessage("An error occurred during Apple sign in");

    let res;
    if (appleData.email == null || appleData.email == undefined) {
      res = await jwt_decode(appleData.identityToken);
    } else {
      res = appleData;
    }

    const fcmtoken = await AsyncStorage.getItem("fcmToken");
    const reqData = {
      email: res.email,
      fcmtoken: fcmtoken,
      name: appleData?.fullName || "",
    };
    try {
      const response = await post("auth/social-login", reqData);
      if (response.data?.success) {
        await AsyncStorage.setItem("token", response.data?.token);
        dispatch(setToken(response.data?.token));
        dispatch(setUserData(response.data?.user));
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainStack",
            },
          ],
        });
      } else {
        ToastMessage("An error occurred during Apple sign in");
      }
    } catch (err) {
      console.log(err);
      ToastMessage("User has not registered with this account");
    }
  } catch (error) {
    ToastMessage("An error occurred during Apple sign in");
  } finally {
    setLoading((prevState) => ({ ...prevState, apple: false }));
  }
};

const handleSignInError = (error) => {
  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    ToastMessage("User cancelled the login flow");
    console.log("User cancelled the login flow");
  } else if (error.code === statusCodes.IN_PROGRESS) {
    console.log("Sign in operation is in progress");
    ToastMessage("Sign in operation is in progress");
  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    console.log("Google Play services are not available");
    ToastMessage("Google Play services are not available");
  } else {
    console.log("An error occurred during Google sign in");
    ToastMessage("An error occurred during Google sign in");
  }
};