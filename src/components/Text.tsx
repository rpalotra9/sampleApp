/**
 * Text.tsx
 * 
 * Custom Text component that applies default font family (Graphik) and
 * default text color to all text throughout the application.
 * 
 * This component wraps React Native's Text component and ensures
 * consistent typography across the app without needing to specify
 * font family in every text element.
 */

import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import { Colors } from '../constants/colors';

interface TextProps extends RNTextProps {
  children?: React.ReactNode;
}

/**
 * Text Component
 * 
 * Custom text component with default font family and color applied.
 * All props from React Native's Text component are supported.
 * 
 * @param {TextProps} props - The component props
 * @returns {JSX.Element} The styled text component
 */
export const Text: React.FC<TextProps> = ({ style, ...props }) => {
  return <RNText style={[styles.defaultText, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Graphik-Regular-Trial',
    color: Colors.textPrimary,
    fontWeight: '400',
  },
});
