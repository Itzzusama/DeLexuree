import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import CustomText from './CustomText';

import {COLORS} from '../utils/COLORS';
import fonts from '../assets/fonts';

const ButtonTab = ({tab, setTab}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        keyExtractor={(_, i) => i.toString()}
        horizontal
        data={[
          'All',
          'Domestic Cleaning',
          'Commercial Cleaning',
          'After Builders Cleaning',
        ]}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setTab(item)}
            style={[
              styles.item,
              {backgroundColor: tab == item ? COLORS.black : 'transparent'},
            ]}>
            <CustomText
              fontFamily={fonts.semiBold}
              label={item}
              fontSize={12}
              color={tab == item ? COLORS.white : COLORS.black}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ButtonTab;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
  },

  item: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
});
