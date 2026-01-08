/**
 * Card.tsx
 * 
 * Reusable card component that provides a consistent container style
 * for grouping related content. Used throughout the app to create
 * visual separation and hierarchy.
 * 
 * Features:
 * - White background with subtle border
 * - Rounded corners
 * - Consistent padding and margins
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../constants/colors';

interface CardProps {
  /** Content to be rendered inside the card */
  children: React.ReactNode;
  /** Optional custom styles to override or extend default card styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * Card Component
 * 
 * A container component that wraps content in a styled card with
 * consistent appearance across the application.
 * 
 * @param {CardProps} props - The component props
 * @returns {JSX.Element} The card UI
 */
export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderCard,
  },
});
