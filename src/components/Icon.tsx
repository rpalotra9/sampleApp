/**
 * Icon.tsx
 * 
 * Reusable icon component that renders SVG icons from the assets/icons directory.
 * Supports customizable size, container styling, and optional circular container.
 * 
 * Features:
 * - Dynamic icon loading from centralized icon registry
 * - Customizable size
 * - Optional container styling for backgrounds/borders
 * - Circular container support
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import icons from '../assets/icons';

interface IconProps {
  /** Icon name to look up in the icons registry */
  iconName: string;
  /** Size of the icon in pixels (default: 48) */
  size?: number;
  /** Optional custom styles for the outer container */
  style?: ViewStyle;
  /** Optional custom styles for the icon container (for backgrounds, borders, etc.) */
  containerStyle?: ViewStyle;
}

/**
 * Icon Component
 * 
 * Renders an SVG icon from the assets/icons directory.
 * 
 * @param {IconProps} props - The component props
 * @returns {JSX.Element | null} The icon UI or null if icon not found
 */
export const Icon: React.FC<IconProps> = ({
  iconName,
  size = 48,
  style,
  containerStyle,
}) => {
  // Look up icon component from registry
  const IconComponent = (icons as Record<string, React.FC<any>>)[iconName];

  // Return null if icon not found
  if (!IconComponent) {
    return null;
  }

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <View
        style={[
          styles.iconContainer,
          { width: size, height: size, borderRadius: size / 2 },
          containerStyle,
        ]}
      >
        <IconComponent width={size} height={size} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
});
