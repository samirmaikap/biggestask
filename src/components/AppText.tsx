import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {FONT_NAME} from '../utils/constants';

const styles = StyleSheet.create({
  h1: {
    fontFamily: FONT_NAME,
    fontWeight: '800',
    fontSize: 30,
    // lineHeight: 40,
  },
  h2: {
    fontFamily: FONT_NAME,
    fontWeight: '700',
    fontSize: 22,
    // lineHeight: 32,
  },
  h3: {
    fontFamily: FONT_NAME,
    fontWeight: '700',
    fontSize: 20,
    // lineHeight: 28,
  },
  h4: {
    fontFamily: FONT_NAME,
    fontWeight: '700',
    fontSize: 16,
    // lineHeight: 24,
  },
  body: {
    fontFamily: FONT_NAME,
    fontSize: 16,
    // lineHeight: 24,
  },
  caption: {
    fontFamily: FONT_NAME,
    fontSize: 12,
    // lineHeight: 16,
  },
  custom: {
    fontFamily: FONT_NAME,
  },
});

const defaultColor = 'black';

type Props = {
  children: React.ReactNode;
  variant?: 'body' | 'h1' | 'h2' | 'h3' | 'h4' | 'custom' | 'caption';
  textStyle?: 'italic' | 'normal';
  color?: string;
  size?: number;
  fontWeight?: string;
  textAlign?: any;
};

const renderH1 = (props: Props, children: any) => {
  const {
    color = defaultColor,
    textStyle = 'normal',
    textAlign = 'auto',
  } = props;
  return (
    <Text
      style={[
        styles.h1,
        {textAlign: textAlign, color: color, fontStyle: textStyle},
      ]}>
      {children}
    </Text>
  );
};

const renderH2 = (props: Props, children: any) => {
  const {
    color = defaultColor,
    textStyle = 'normal',
    textAlign = 'auto',
  } = props;
  return (
    <Text
      style={[
        styles.h2,
        {textAlign: textAlign, color: color, fontStyle: textStyle},
      ]}>
      {children}
    </Text>
  );
};

const renderH3 = (props: Props, children: any) => {
  const {
    color = defaultColor,
    textStyle = 'normal',
    textAlign = 'auto',
  } = props;
  return (
    <Text
      style={[
        styles.h3,
        {textAlign: textAlign, color: color, fontStyle: textStyle},
      ]}>
      {children}
    </Text>
  );
};

const renderH4 = (props: Props, children: any) => {
  const {
    color = defaultColor,
    textStyle = 'normal',
    textAlign = 'auto',
  } = props;
  return (
    <Text
      style={[
        styles.h4,
        {textAlign: textAlign, color: color, fontStyle: textStyle},
      ]}>
      {children}
    </Text>
  );
};

const renderBody = (props: Props, children: any) => {
  const {
    color = defaultColor,
    textStyle = 'normal',
    textAlign = 'auto',
    fontWeight = 'normal',
  } = props;
  return (
    <Text
      style={[
        styles.body,
        {
          textAlign: textAlign,
          color: color,
          fontStyle: textStyle,
          fontWeight: fontWeight as any,
        },
      ]}>
      {children}
    </Text>
  );
};

const renderCaption = (props: Props, children: any) => {
  const {
    color = defaultColor,
    textStyle = 'normal',
    textAlign = 'auto',
  } = props;
  return (
    <Text
      style={[
        styles.caption,
        {textAlign: textAlign, color: color, fontStyle: textStyle},
      ]}>
      {children}
    </Text>
  );
};

const renderCustom = (props: Props, children: any) => {
  const {
    color = defaultColor,
    textStyle = 'normal',
    size = 16,
    fontWeight = '500',
    textAlign = 'auto',
  } = props;
  return (
    <Text
      style={[
        styles.custom,
        {
          color: color,
          fontStyle: textStyle,
          fontSize: size,
          fontWeight: fontWeight as any,
          textAlign: textAlign,
        },
      ]}>
      {children}
    </Text>
  );
};

export const AppText = (props: Props) => {
  const {children, variant = 'body'} = props;
  switch (variant) {
    case 'h1':
      return renderH1(props, children);
    case 'h2':
      return renderH2(props, children);
    case 'h3':
      return renderH3(props, children);
    case 'h4':
      return renderH4(props, children);
    case 'custom':
      return renderCustom(props, children);
    case 'caption':
      return renderCaption(props, children);
    default:
      return renderBody(props, children);
  }
};
