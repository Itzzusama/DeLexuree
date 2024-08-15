import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";

import ImageFast from "../../../components/ImageFast";

import { mapStyle } from "../../../utils/constants";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import ScreenWrapper from "../../../components/ScreenWrapper";
import NoShow from "../../../components/NoShow";
import CustomerCard from "../OrderDetail/molecules/CustomerCard";
import { formatDate, formatTime } from "../../../utils/dateUtils";

const Maps = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { detail } = route.params;
  const mapRef = useRef();
  const focus = useIsFocused();
  useEffect(() => {
    mapRef.current?.animateToRegion(
      {
        latitude: detail?.location?.lat,
        longitude: detail?.location?.lng,
        latitudeDelta: 0.545,
        longitudeDelta: 0.545,
      },
      1000
    );
  }, [focus]);
  const onChatPress = async () => {
    const dataToSend = {
      id: detail?.user?._id,
      img: detail?.user?.profilePicture,
      name: detail?.user?.name,
      type: detail?.user?.type,
    };
    navigation.navigate("InboxScreen", { data: dataToSend });
  };
  return (
    <ScreenWrapper
      translucent
      statusBarColor="transparent"
      paddingHorizontal={0.1}
      barStyle="light-content"
    >
      <MapView
        //provider={PROVIDER_GOOGLE}
        mapType="standard" // You can use "standard", "satellite", "hybrid", or "terrain"
        showsBuildings={true}
        camera={{
          pitch: 45, // This sets the 3D pitch
          heading: 0,
          altitude: 1000,
          center: {
            latitude: detail?.location?.lat,
            longitude: detail?.location?.lng,
          },
          zoom: 16.5,
        }}
        ref={mapRef}
        style={{ width: "100%", flex: 1 }}
        initialRegion={{
          latitude: detail?.location?.lat,
          longitude: detail?.location?.lng,
          latitudeDelta: 0.545,
          longitudeDelta: 0.545,
        }}
      >
        <Marker
          coordinate={{
            latitude: detail?.location?.lat,
            longitude: detail?.location?.lng,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <ImageFast
              source={Images.pin}
              resizeMode="cover"
              style={{
                width: 37,
                height: 37,
              }}
            />
          </View>
        </Marker>
      </MapView>
      <View style={styles.bottomList}>
        <CustomerCard
          color={COLORS.white}
          backgroundColor={COLORS.white}
          imageUrl={detail?.user?.profilePicture}
          name={detail?.user?.name}
          date={formatDate(detail?.date)}
          time={formatTime(detail?.time)}
          address={detail?.location?.address}
          description={detail?.user?.email}
          onChatPress={onChatPress}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Maps;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomList: {
    position: "absolute",
    bottom: 30,
    marginHorizontal: 20,
    right: 0,
    left: 0,
  },
});
