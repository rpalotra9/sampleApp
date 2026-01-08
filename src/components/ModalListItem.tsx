/**
 * ModalListItem.tsx
 * 
 * Reusable list item component for rendering items within selection modals.
 * This component provides:
 * - Optional icon display with customizable container styling
 * - Label text
 * - Checkmark indicator for selected items
 * - Consistent styling and touch feedback
 * 
 * Used across AppSelectionModal, CategorySelectionModal, and SelectionModal
 * to maintain consistent list item appearance and behavior.
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Icon } from './Icon';
import { Text } from './Text';
import { Colors } from '../constants/colors';

interface ModalListItemProps {
  /** The text label to display */
  label: string;
  /** Optional icon name to display before the label */
  iconName?: string;
  /** Size of the icon (default: 40) */
  iconSize?: number;
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Callback function when item is pressed */
  onPress: () => void;
  /** Optional custom styles for the icon container */
  iconContainerStyle?: ViewStyle;
  /** Optional custom styles for the item container */
  itemStyle?: ViewStyle;
  /** Optional custom styles for the wrapper container */
  wrapperStyle?: ViewStyle;
}

/**
 * ModalListItem Component
 * 
 * Renders a single list item with optional icon, label, and selection indicator.
 * 
 * @param {ModalListItemProps} props - The component props
 * @returns {JSX.Element} The list item UI
 */
export const ModalListItem: React.FC<ModalListItemProps> = ({
  label,
  iconName,
  iconSize = 40,
  isSelected,
  onPress,
  iconContainerStyle,
  itemStyle,
  wrapperStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.wrapper, wrapperStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.item, itemStyle]}>
        {/* Conditionally render icon if iconName is provided */}
        {iconName && (
          <Icon
            iconName={iconName as string}
            size={iconSize}
            containerStyle={iconContainerStyle}
          />
        )}
        
        {/* Item label text */}
        <Text style={styles.label}>{label}</Text>
        
        {/* Checkmark indicator for selected items */}
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <Icon iconName="CheckCircle" size={20} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
