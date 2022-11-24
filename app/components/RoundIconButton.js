import {StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../misc/colors';

const RoundIconButton = ({icon, size, style, clickEvent}) => {
  return (
    <Icon
      onPress={clickEvent}
      name={icon || 'checkcircle'}
      size={size || 30}
      style={[styles.iconBtn, {...style}]}
    />
  );
};

export default RoundIconButton;

const styles = StyleSheet.create({
  iconBtn: {
    padding: 4,
    backgroundColor: colors.PRIMARY,
    color: colors.LIGHT,
    borderRadius: 50,
    elevation: 5,
  },
});
