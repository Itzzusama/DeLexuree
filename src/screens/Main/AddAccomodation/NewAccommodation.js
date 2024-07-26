import {View, Text, StyleSheet, Switch} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Header from '../../../components/Header';
import CustomDropDown from '../../../components/CustomDropDown';
import CustomText from '../../../components/CustomText';
import fonts from '../../../assets/fonts';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import Gallery from '../../../components/Gallery';
import {post, put} from '../../../Services/ApiRequest';
import GooglePlaces from '../../../components/GooglePlaces';

const NewAccommodation = ({navigation, route}) => {
  const item = route.params?.item;
  const isEdit = route.params?.isEdit;
  const init = {
    title: isEdit ? item?.title : '',
    des: isEdit ? item?.description : '',
    price: isEdit ? item?.price.toString()  : '',
    cleaningFee: isEdit ? item?.cleaning_fee.toString()  : '',
  };


  const inits = {
    titleError: '',
    desError: '',
    priceError: '',
    cleaningFeeError: '',
  };

  const [state, setState] = useState(init);
  const [errors, setErrors] = useState(inits);
  const [refreshing, setRefreshing] = useState(false);
  const [address, setAddress] = useState(isEdit ? item?.location?.address : '');

  // console.log('clean--------------------------------', state?.price);


  const [facilities, setFacilities] = useState({
    selectedCategory: isEdit ? item?.accomodation?.type : '',
    bedRooms: isEdit ? item?.accomodation?.beds : '',
    bathRooms: isEdit ? item?.accomodation?.bath : '',
    guests: isEdit ? item?.guest : '',
    parking: false,
    garden: false,
    balcony: false,
    airConditioning: false,
    walkInCloset: false,
    highSpeedInternet: false,
    securitySystem: false,
    heatingSystem: false,
    petsAllowed: false,
  });

  useEffect(() => {
    if (isEdit && item?.facilities) {
      const updatedFacilities = {...facilities};
      item.facilities.forEach(facility => {
        if (updatedFacilities.hasOwnProperty(facility)) {
          updatedFacilities[facility] = true;
        }
      });
      setFacilities(updatedFacilities);
    }
  }, [isEdit, item]);
  const array = [
    {
      id: 1,
      placeholder: 'Title',
      value: state.title,
      onChange: text => setState({...state, title: text}),
      error: errors.titleError,
    },
    {
      id: 1.2,
      placeholder: 'Price Per Night',
      value: state.price,
      onChange: text => setState({...state, price: text}),
      error: errors.priceError,
      number: true,
    },
    {
      id: 1.3,
      placeholder: 'Cleaning Fee',
      value: state.cleaningFee,
      onChange: text => setState({...state, cleaningFee: text}),
      error: errors.cleaningFeeError,
      number: true,
    },
    {
      id: 2,
      placeholder: 'Description',
      value: state.des,
      onChange: text => setState({...state, des: text}),
      error: errors.desError,
      multiline: true,
    },
  ];

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.title) newErrors.titleError = 'Please enter Title ';
      else if (!state.price) newErrors.priceError = 'Please enter Price';
      else if (!state.cleaningFee)
        newErrors.cleaningFeeError = 'Please enter Cleaning Fee';
      else if (!state.des) newErrors.desError = 'Please enter Description';
      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);


  const handleSwitchChange = facility => {
    setFacilities(prevState => ({
      ...prevState,
      [facility]: !prevState[facility],
    }));
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const selectedFacilities = Object.keys(facilities).filter(
    facility => facilities[facility] === true,
  );

  const [imagesFromGallery, setImagesFromGallery] = useState(
    isEdit ? item?.images : [],
  );

  const handleCreateAccommodation = async () => {
    setRefreshing(true);
    const body = {
      title: state.title,
      images: imagesFromGallery,
      category: 'accomodation',
      description: state?.des,
      price: state?.price,
      type: 'accomodation',
      cleaning_fee: state?.cleaningFee,
      facilities: selectedFacilities,
      guest: facilities?.guests,
      pet: facilities?.petsAllowed,
      accomodation: {
        child: false,
        slefcheckIn: false,
        beds: facilities?.bedRooms,
        bath: facilities?.bathRooms,
        type: facilities?.selectedCategory,
      },
      location: {
        type: 'point',
        address: address,
        coordinates: [-74.006, 40.7128],
      },
    };
    try {
      setRefreshing(true);
      const response = await post('service/create', body);
      // console.log('respon written', response);
      navigation.goBack();
      // if (response.data?.success) {
      //   ToastMessage(response.data?.message);
      // } else {
      //   ToastMessage(response.data?.message);
      // }
    } catch (error) {
      console.log('errr', error);
    } finally {
      setRefreshing(false);
    }
  };



  const handleEditAccommodation = async () => {
    setRefreshing(true);
    const body = {
      title: state.title,
      images: imagesFromGallery,
      category: 'accomodation',
      description: state?.des,
      price: state?.price,
      cleaning_fee: state?.cleaningFee,
      type: 'accomodation',
      facilities: selectedFacilities,
      guest: facilities?.guests,
      pet: facilities?.petsAllowed,
      accomodation: {
        child: false,
        slefcheckIn: false,
        beds: facilities?.bedRooms,
        bath: facilities?.bathRooms,
        type: facilities?.selectedCategory,
      },
      location: {
        type: 'point',
        address: address,
        coordinates: [-74.006, 40.7128],
      },
    };
    console.log('body--------------------------------', body);
    try {
      setRefreshing(true);
      const response = await put('service/edit/' + item?._id, body);
      console.log('respon edit------------', response?.data);
      navigation.goBack();
      // if (response.data?.success) {
      //   ToastMessage(response.data?.message);
      // } else {
      //   ToastMessage(response.data?.message);
      // }
    } catch (error) {
      console.log('errr', error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScreenWrapper
      paddingBottom={6}
      scrollEnabled
      headerUnScrollable={() => <Header title="New Accommodation" />}>
      {!isEdit && (
        <Gallery
          maxLength={8}
          onImagesUpdate={images => {
            setImagesFromGallery(images);
          }}
        />
      )}
      

      {array.map(item => (
        <CustomInput
          key={item?.id}
          placeholder={item.placeholder}
          value={item.value}
          onChangeText={item.onChange}
          error={item.error}
          multiline={item?.multiline}
          height={item.multiline ? 140 : 55}
          keyboardType={item?.number ? 'number-pad' : 'default'}
        />
      ))}
      <GooglePlaces
        // key={item.id}
        value={address}
        setValue={setAddress}
        // placeholder={item.placeholder}
        // error={errors.addressError}
      />

      <CustomDropDown
        withLabel={'Accommodation Type'}
        options={['Flat/Apartment', 'House', 'Mansion']}
        placeholder="Select Accommodation Type"
        value={facilities.selectedCategory}
        setValue={value =>
          setFacilities(prevState => ({...prevState, selectedCategory: value}))
        }
      />
      <CustomDropDown
        withLabel={'No of Guests'}
        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
        placeholder="Select No of Guests"
        value={facilities.guests}
        setValue={value =>
          setFacilities(prevState => ({...prevState, guests: value}))
        }
      />
      <CustomDropDown
        withLabel={'No of Bedrooms'}
        options={['1', '2', '3', '4', '5', '6']}
        placeholder="Select No of Bedrooms"
        value={facilities.bedRooms}
        setValue={value =>
          setFacilities(prevState => ({...prevState, bedRooms: value}))
        }
      />
      <CustomDropDown
        withLabel={'No of Bathrooms'}
        options={['1', '2', '3', '4', '5', '6']}
        placeholder="Select No of Bathrooms"
        value={facilities.bathRooms}
        setValue={value =>
          setFacilities(prevState => ({...prevState, bathRooms: value}))
        }
      />

      <CustomText
        label="Select the facilities you want to add..."
        fontSize={16}
        fontFamily={fonts.semiBold}
      />

      <View style={styles.container}>
        {Object.keys(facilities).map(facility => {
          if (typeof facilities[facility] !== 'boolean') return null;
          return (
            <View key={facility} style={styles.switchContainer}>
              <CustomText textStyle={styles.label}>
                {capitalizeFirstLetter(
                  facility.replace(/([A-Z])/g, ' $1').trim(),
                )}
              </CustomText>
              <Switch
                value={facilities[facility]}
                onValueChange={() => handleSwitchChange(facility)}
              />
            </View>
          );
        })}
      </View>
      <CustomButton
        disabled={!Object.values(errors).every(error => error === '')}
        title={isEdit ? 'Save Changes' : 'Add Accommodation'}
        onPress={isEdit ? handleEditAccommodation : handleCreateAccommodation}
        loading={refreshing}
      />
    </ScreenWrapper>
  );
};

export default NewAccommodation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
});

