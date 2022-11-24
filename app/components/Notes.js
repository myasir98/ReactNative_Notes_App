import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import colors from '../misc/colors';

const Notes = ({note: {title, description}, style, clickEvent}) => {
  return (
    <TouchableOpacity
      onPress={clickEvent}
      style={[styles.container, {...style}]}>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={8}>{description}</Text>
    </TouchableOpacity>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.DARK,
    borderRadius: 5,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
});
