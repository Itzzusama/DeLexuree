import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  View,
} from 'react-native';

import CustomInput from './CustomInput';
import CustomModal from './CustomModal';
import CustomText from './CustomText';
import Icons from './Icons';

import {COLORS} from '../utils/COLORS';
import fonts from '../assets/fonts';

const {width} = Dimensions.get('window');

const GooglePlaces = ({
  value,
  setValue,
  setState,
  setLatLong,
  withLabel,
  error,
}) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const [predictions, setPredictions] = useState([]);
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);
  const apiKey = 'AIzaSyCxqIkOLrrj8jGBh9ciBGoksB-Wsyb4wQI';

  const handleSearch = async text => {
    setSearchQuery(text);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${text}`,
      );
      const data = await response.json();
      if (data.predictions) {
        setPredictions(data.predictions);
      }
    } catch (error) {
      console.error('Error fetching predictions', error);
    }
  };
  const handlePredictionPress = item => {
    setValue(item?.description);
    // console.log("this is  address------------",item    );
    setModal(false);

    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${item.place_id}`,
        );
        const data = await response.json();

        if (data.result && data.result.address_components) {
          const stateComponent = data.result.address_components.find(
            component =>
              component.types.includes('administrative_area_level_1'),
          );
          const state = stateComponent ? stateComponent.long_name : null;
          setState?.(state);

          if (data.result.geometry && data.result.geometry.location) {
            const {lat, lng} = data.result.geometry.location;
            setLatLong?.({latitude: lat, longitude: lng});
          } else {
            console.error(
              'Location information not available in the detailed place data',
            );
          }
          setSearchQuery(item.description);
          setPredictions([]);
        } else {
          console.error(
            'Address components not available in the detailed place data',
          );
        }
      } catch (error) {
        console.error('Error fetching place details', error);
      }
    };

    fetchPlaceDetails();
  };

  return (
    <>
      {withLabel ? (
        <CustomText
          fontFamily={fonts.medium}
          color={COLORS.black}
          marginBottom={5}
          label={withLabel}
        />
      ) : null}
      <TouchableOpacity
        style={[
          styles.mainContainer,
          {
            marginBottom: error ? 5 : 20,
            borderColor: error ? COLORS.red : COLORS.lightGray,
          },
        ]}
        activeOpacity={0.6}
        onPress={() => setModal(true)}>
        <View style={styles.input}>
          <CustomText
            label={value || 'Address'}
            fontFamily={fonts.regular}
            fontSize={14}
            color={value?.length ? COLORS.black : COLORS.authText}
          />
        </View>
      </TouchableOpacity>
      {error && (
        <CustomText label={error} color={COLORS.red} marginBottom={20} />
      )}
      {isModal && (
        <CustomModal isVisible={isModal} onDisable={() => setModal(false)}>
          <View style={styles.modalMainContainer}>
            <Icons
              family="Entypo"
              name="circle-with-cross"
              size={30}
              color={COLORS.black}
              style={{alignSelf: 'flex-end', marginBottom: 15}}
              onPress={() => setModal(false)}
            />
            <CustomInput
              placeholder="Address"
              withLabel={withLabel}
              value={searchQuery}
              autoFocus
              marginBottom={predictions?.length ? 0.1 : 20}
              onChangeText={text => handleSearch(text)}
            />
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              <FlatList
                data={predictions}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => handlePredictionPress(item)}>
                    <CustomText
                      fontFamily={fonts.semiBold}
                      fontSize={12}
                      label={item.description}
                    />
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
        </CustomModal>
      )}
    </>
  );
};

export default GooglePlaces;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: COLORS.lightGray,
    height: 55,
    width: '100%',
  },
  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    width: width,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
  },
  input: {
    width: '98%',
    height: '100%',
    justifyContent: 'center',
  },
  leftIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  modalMainContainer: {
    alignSelf: 'center',
    width: '95%',
    height: '99%',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 15,
  },
});