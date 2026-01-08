/**
 * SearchInput.tsx
 * 
 * Reusable input component with icon prefix.
 * Used for search fields and input fields that require an icon on the left.
 * 
 * Features:
 * - Icon on the left side
 * - TextInput with customizable props
 * - Consistent styling across the app
 * - Supports both search and amount input use cases
 */

import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { Icon } from './Icon';
import { Colors } from '../constants/colors';

interface SearchInputProps extends TextInputProps {
  /** Icon name to display on the left */
  iconName: string;
  /** Optional custom styles for the container */
  containerStyle?: ViewStyle;
  /** Optional icon size (default: 22) */
  iconSize?: number;
}

/**
 * SearchInput Component
 * 
 * Renders an input field with an icon prefix.
 * Supports ref forwarding for TextInput.
 * 
 * @param {SearchInputProps} props - The component props
 * @returns {JSX.Element} The search input UI
 */
export const SearchInput = React.forwardRef<TextInput, SearchInputProps>(({
  iconName,
  containerStyle,
  iconSize = 22,
  style,
  ...textInputProps
}, ref) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon iconName={iconName} size={iconSize} />
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholderTextColor={Colors.textPlaceholder}
        {...textInputProps}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 11,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});

