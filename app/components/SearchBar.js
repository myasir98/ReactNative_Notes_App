import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../misc/colors';

const SearchBar = ({style}) => {
  return (
    <View style={[styles.container, {...style}]}>
      <TextInput style={styles.searchBar} placeholder="Search here ..." />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    padding: 10,
    fontSize: 20,
  },
  container: {},
});
