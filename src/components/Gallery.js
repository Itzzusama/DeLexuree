import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {Image as ImageCompressor} from 'react-native-compressor';
import React, {useEffect, useState} from 'react';
import UploadImage from './UploadImage';
import CustomText from './CustomText';
import ImageFast from './ImageFast';
import Icons from './Icons';



import { COLORS } from '../utils/COLORS';
import fonts from '../assets/fonts';
import storage from '@react-native-firebase/storage';
import { ToastMessage } from '../utils/ToastMessage';

const Gallery = ({onImageValid = () => '', onImagesUpdate, maxLength}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [images, setImages] = useState([]);

  // console.log('images-----------', images);

  const simulateConditionMet = () => {
    if (images?.length == 2) {
      onImageValid();
    } else null;
  };
  useEffect(() => {
    simulateConditionMet();
  }, [images]);

  const uploadAndGetUrl = async file => {
    // setImageLoader(true);
    try {
      const resizeUri = await ImageCompressor.compress(
        file.fileCopyUri || file.path,
      );
      const filename = `images/${new Date()
        .toISOString()
        .replace(/[.:-]+/g, '_')}`;
      const uploadUri =
        Platform.OS === 'ios' ? resizeUri.replace('file://', '') : resizeUri;
      const storageRef = storage().ref(filename);
      await storageRef.putFile(uploadUri);
      const url = await storageRef.getDownloadURL();
      ToastMessage('Image uploaded successfully');
      return url;
    } catch (err) {
      console.log('=======er', err);
      ToastMessage('Upload Again');
    } finally {
      // setImageLoader(false);
    }
  };

  const getImages = async res => {
    if (res?.path) {
      setImageLoading(true);
      const url = await uploadAndGetUrl(res);
      console.log('url consle--->', url);
      setImages(prevImages => [...prevImages, url]);
      onImagesUpdate(prevImages => [...prevImages, url]);
      setImageLoading(false);
    } else {
      setImageLoading(false);
      const uploadPromises = res.map(image => {
        return new Promise(async (resolve, reject) => {
          try {
            const url = await uploadAndGetUrl(image);
            resolve(url);
            setImageLoading(false);
          } catch (error) {
            reject(error);
            setImageLoading(false);
          }
        });
      });
      try {
        const uploadedImages = await Promise.all(uploadPromises);
        setImages(prevImages => [...prevImages, ...uploadedImages]);
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    }
  };

  return (
    <View style={{flex: 1, marginBottom: 12}}>
      <CustomText
        label="Upload Images"
        fontSize={18}
        fontFamily={fonts.medium}
        marginTop={12}
      />

      {imageLoading && <ActivityIndicator color={'black'} size={'large'} />}
      {imageLoading ? null : (
        <CustomText
          label={`Max ${maxLength} Images`}
          alignSelf="flex-end"
          fontFamily={fonts.medium}
        />
      )}
      <View style={styles.row}>
        {images?.map((item, i) => (
          <View key={i} style={styles.imgContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                setImages(images?.filter((_, index) => index !== i))
              }
              style={styles.deleteContainer}>
              <Icons
                family="AntDesign"
                name="delete"
                color={COLORS.red}
                size={16}
              />
            </TouchableOpacity>
            <ImageFast
              isView
              resizeMode="cover"
              source={{uri: item}}
              style={styles.img}
            />
          </View>
        ))}
      </View>
      {imageLoading ? null : (
        <>
          {images?.length < maxLength && (
            <UploadImage
              handleChange={async res => getImages(res)}
              renderButton={res => (
                <TouchableOpacity
                  onPress={res}
                  activeOpacity={0.6}
                  style={styles.uploadImage}>
                  <Icons
                    family="Feather"
                    name="upload"
                    size={25}
                    color={COLORS.black}
                  />
                  <CustomText
                    label="Upload Picture(s)"
                    fontFamily={fonts.medium}
                    marginLeft={10}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
    </View>
  );
};
export default Gallery;
const styles = StyleSheet.create({
  uploadImage: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS?.darkGray,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  imgContainer: {
    width: '48%',
    height: 100,
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  deleteContainer: {
    width: 22,
    height: 22,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS?.lightGray,
    elevation: 2,
    position: 'absolute',
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
  },
});
