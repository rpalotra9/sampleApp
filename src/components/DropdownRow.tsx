/**
 * DropdownRow.tsx
 * 
 * Reusable row component for displaying dropdown/selection fields.
 * Used in forms to show a label and selected value with a dropdown arrow.
 * 
 * Features:
 * - Label on the left
 * - Selected value or placeholder on the right
 * - Optional right component (e.g., category icon)
 * - Dropdown arrow indicator
 * - Touch feedback for interaction
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import { Text } from './Text';
import { Colors } from '../constants/colors';

interface DropdownRowProps {
  /** Label text displayed on the left */
  label: string;
  /** Currently selected value */
  value: string;
  /** Placeholder text when no value is selected (default: 'Choose an option') */
  placeholder?: string;
  /** Callback function when row is pressed */
  onPress: () => void;
  /** Whether to show the dropdown arrow icon (default: true) */
  showIcon?: boolean;
  /** Optional component to render on the right side (e.g., category icon) */
  rightComponent?: React.ReactNode;
}

/**
 * DropdownRow Component
 * 
 * Renders a row with label and value that opens a selection modal when pressed.
 * 
 * @param {DropdownRowProps} props - The component props
 * @returns {JSX.Element} The dropdown row UI
 */
export const DropdownRow: React.FC<DropdownRowProps> = ({
  label,
  value,
  placeholder = 'Choose an option',
  onPress,
  showIcon = true,
  rightComponent,
}) => {
  // Determine display value and text color based on selection state
  const displayValue = value || placeholder;
  const textColor = value ? Colors.textPrimary : Colors.textSecondary;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        {/* Label text */}
        <Text style={styles.label}>{label}</Text>
        
        {/* Right side: optional component, value, and dropdown arrow */}
        <View style={styles.rightContainer}>
          {rightComponent}
          <Text style={[styles.value, { color: textColor }]}>
            {displayValue}
          </Text>
          {showIcon && (
            <View style={styles.iconContainer}>
              <Icon iconName="DropdownArrow" size={13} />
            </View>
          )}
        </View>
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
    color: Colors.textSecondary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 4,
  },
});
