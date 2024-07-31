import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";

import ImageFast from "../../../components/ImageFast";

import { mapStyle } from "../../../utils/constants";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import ScreenWrapper from "../../../components/ScreenWrapper";

const Maps = () => {
  const mapRef = useRef();
  const focus = useIsFocused();
  useEffect(() => {
    mapRef.current?.animateToRegion(
      {
        latitude: 31.5204,
        longitude: 74.3587,
        latitudeDelta: 0.545,
        longitudeDelta: 0.545,
      },
      1000
    );
  }, [focus]);
  return (
    <ScreenWrapper
      translucent
      statusBarColor="transparent"
      paddingHorizontal={0.1}
      barStyle="light-content"
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        mapType="satellite" // You can use "standard", "satellite", "hybrid", or "terrain"
        showsBuildings={true}
        camera={{
          pitch: 45, // This sets the 3D pitch
          heading: 0,
          altitude: 1000,
          center: {
            latitude: 31.5204,
            longitude: 74.3587,
          },
          zoom: 16.5,
        }}
        ref={mapRef}
        style={{ width: "100%", flex: 1 }}
        initialRegion={{
          latitude: 31.5204,
          longitude: 74.3587,
          latitudeDelta: 0.545,
          longitudeDelta: 0.545,
        }}
      >
        <Marker
          coordinate={{
            latitude: 31.5204,
            longitude: 74.3587,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <ImageFast
              source={Images.user}
              resizeMode="cover"
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: COLORS.gray2,
              }}
            />
          </View>
        </Marker>
      </MapView>
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
});
