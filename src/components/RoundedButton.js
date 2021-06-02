import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export const RoundedButton = ({
  viewStyle = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
   <TouchableOpacity style={[styles(size).viewRadius, viewStyle]} onPress={props.onPress}> 
    <Text 
        style={[styles(size).text, textStyle]}>
            {props.title}
    </Text> 
</TouchableOpacity>
      // <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    // <TouchbleOpacity style={[styles(size).viewRadius, viewStyle]}>
    // </TouchbleOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    viewRadius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
      borderWidth: 2,
    },
    text: {
      color: '#fff',
      fontSize: 20,
    },
  });
