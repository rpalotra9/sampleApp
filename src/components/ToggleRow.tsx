/**
 * ToggleRow.tsx
 * 
 * Row component with a label and a custom toggle switch.
 * Uses a custom animated switch component for consistent appearance
 * across iOS and Android platforms.
 * 
 * Features:
 * - Label on the left
 * - Custom animated switch on the right
 * - Smooth spring animation for state changes
 * - Consistent styling across platforms
 */

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text } from './Text';
import { Colors } from '../constants/colors';

interface ToggleRowProps {
  /** Label text displayed on the left */
  label: string;
  /** Current toggle state */
  value: boolean;
  /** Callback function when toggle value changes */
  onValueChange: (value: boolean) => void;
}

/**
 * CustomSwitch Component
 * 
 * A custom animated switch component that provides consistent appearance
 * and behavior across iOS and Android platforms.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.value - Current switch state
 * @param {(value: boolean) => void} props.onValueChange - Callback when switch is toggled
 * @returns {JSX.Element} The custom switch UI
 */
const CustomSwitch: React.FC<{
  value: boolean;
  onValueChange: (value: boolean) => void;
}> = ({ value, onValueChange }) => {
  // Animated value for thumb position (0 = off, 1 = on)
  const translateX = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Animate thumb position when value changes
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [value, translateX]);

  /**
   * Handles switch press - toggles the value
   */
  const handlePress = () => {
    onValueChange(!value);
  };

  // Switch dimensions
  const switchWidth = 51;
  const switchHeight = 31;
  const thumbSize = 27;
  const thumbPadding = 2;
  const maxTranslate = switchWidth - thumbSize - thumbPadding * 2;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.switchTrack,
        {
          width: switchWidth,
          height: switchHeight,
          backgroundColor: value ? Colors.switchOn : Colors.switchOff,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.switchThumb,
          {
            width: thumbSize,
            height: thumbSize,
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [thumbPadding, maxTranslate],
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

/**
 * ToggleRow Component
 * 
 * Renders a row with label and custom toggle switch.
 * 
 * @param {ToggleRowProps} props - The component props
 * @returns {JSX.Element} The toggle row UI
 */
export const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {/* Custom switch for consistent cross-platform appearance */}
      <CustomSwitch value={value} onValueChange={onValueChange} />
    </View>
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
  switchTrack: {
    borderRadius: 15.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  switchThumb: {
    backgroundColor: Colors.switchThumb,
    borderRadius: 13.5,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
