/**
 * DatePickerRow.tsx
 * 
 * Row component for displaying and selecting dates.
 * Shows a label and formatted date value, or placeholder when no date is selected.
 * Opens a date picker modal when pressed.
 * 
 * Features:
 * - Label on the left
 * - Formatted date in a styled container when selected
 * - Placeholder text when no date is selected
 * - Touch feedback for interaction
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Colors } from '../constants/colors';
import { formatDate } from '../utils';

interface DatePickerRowProps {
  /** Label text displayed on the left */
  label: string;
  /** Currently selected date (null if no date selected) */
  value: Date | null;
  /** Callback function when row is pressed */
  onPress: () => void;
}

/**
 * DatePickerRow Component
 * 
 * Renders a row with label and date value that opens a date picker modal when pressed.
 * 
 * @param {DatePickerRowProps} props - The component props
 * @returns {JSX.Element} The date picker row UI
 */
export const DatePickerRow: React.FC<DatePickerRowProps> = ({
  label,
  value,
  onPress,
}) => {

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {value ? (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formatDate(value)}</Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>Select date</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  dateContainer: {
    backgroundColor: Colors.backgroundGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dateText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  placeholder: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
});
