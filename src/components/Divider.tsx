/**
 * Divider.tsx
 * 
 * Simple divider component for visual separation between UI elements.
 * Used in lists, cards, and forms to create clear visual boundaries.
 * 
 * Features:
 * - Thin horizontal line
 * - Consistent color and styling
 * - Optional custom styling support
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../constants/colors';

interface DividerProps {
  /** Optional custom styles to override or extend default divider styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * Divider Component
 * 
 * Renders a horizontal divider line for visual separation.
 * 
 * @param {DividerProps} props - The component props
 * @returns {JSX.Element} The divider UI
 */
export const Divider: React.FC<DividerProps> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 0,
  },
});
