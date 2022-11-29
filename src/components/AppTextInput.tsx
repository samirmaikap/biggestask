import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {AppText} from './AppText';
import {Colors} from '../theme/colors';

const styles = StyleSheet.create({
  input: {
    paddingVertical: 0,
    minHeight: 48,
    paddingHorizontal: 0,
  },
});

type Props = {
  value: any;
  onValueChange: Function;
  placeholder?: string;
  label?: string;
  right?: any;
  left?: any;
  error?: boolean;
  disabled?: boolean;
  onBlur?: Function;
  multiline?: boolean;
  numberOfLines?: number;
  limit?: number;
  height?: number;
};

export const AppTextInput = (props: Props) => {
  const theme = useTheme();
  const {
    value,
    onValueChange,
    placeholder,
    label,
    right,
    left,
    error = false,
    disabled = false,
    onBlur,
    numberOfLines = 1,
    multiline = false,
    limit = undefined,
    height = 50,
  } = props;

  return (
    <View>
      {label && (
        <View style={{marginBottom: 4}}>
          <AppText>{label}</AppText>
        </View>
      )}
      <TextInput
        mode={'outlined'}
        placeholder={placeholder}
        right={right}
        left={left}
        error={error}
        disabled={disabled}
        maxLength={limit}
        onChangeText={(v: any) => onValueChange(v)}
        // onChange={(e: any) => console.log(e.target)}
        onBlur={() => onBlur && onBlur()}
        multiline={multiline}
        numberOfLines={numberOfLines}
        outlineStyle={{borderColor: Colors.grey_bg}}
        value={value}
        style={[
          styles.input,
          {height: height, backgroundColor: Colors.grey_bg},
        ]}
        textColor={theme.colors.text}
        theme={{roundness: 12}}
      />
    </View>
  );
};
