/**
 * Header.tsx
 * 
 * Header component for the Edit Subscription screen.
 * Displays:
 * - Back button with icon (navigates back)
 * - Screen title (centered)
 * - Save button (right-aligned, disabled when no app is selected)
 * 
 * This component is used at the top of the EditSubscriptionScreen to provide
 * navigation and action controls.
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, BackHandler, Platform } from 'react-native';
import { Icon } from './Icon';
import { Text } from './Text';
import { Colors } from '../constants/colors';
import { Texts } from '../constants/texts';
import { App } from '../types';

interface HeaderProps {
  /** Currently selected app (null if none selected) */
  selectedApp: App | null;
}

/**
 * Header Component
 * 
 * Renders the header bar with back button, title, and save button.
 * Save button is disabled when no app is selected.
 * 
 * @param {HeaderProps} props - The component props
 * @returns {JSX.Element} The header UI
 */
export const Header: React.FC<HeaderProps> = ({ selectedApp }) => {
  /**
   * Handles the back button press - closes the app
   */
  const handleBack = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      // iOS doesn't allow programmatic app closing
      // This will just do nothing or you can show an alert
      // For now, we'll use BackHandler which might work in some cases
      BackHandler.exitApp();
    }
  };

  /**
   * Handles the save action.
   * Currently logs to console - to be implemented with actual save logic.
   */
  const handleSave = () => {
    // Only allow save if an app is selected
    if (!selectedApp) {
      return;
    }
    // TODO: Implement save subscription logic
    console.log('Save subscription');
  };

  const isSaveDisabled = !selectedApp;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack}>
        <View style={styles.backButton}>
          <Icon
            iconName="BackArrow"
            size={14}
            containerStyle={styles.backIconContainer}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{Texts.editSubscription}</Text>
      <TouchableOpacity 
        onPress={handleSave}
        disabled={isSaveDisabled}
        activeOpacity={isSaveDisabled ? 1 : 0.7}
      >
        <Text style={[
          styles.saveButton,
          isSaveDisabled && styles.saveButtonDisabled
        ]}>
          {Texts.save}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconContainer: {
    backgroundColor: Colors.backgroundWhite,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderColor: Colors.borderLight,
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily:'Graphik-Medium-Trial',
    fontWeight: '500',
  },
  saveButton: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily:'Graphik-Medium-Trial',
    color: Colors.primary,
  },
  saveButtonDisabled: {
    color: Colors.textTertiary, // #98A2B3
  },
});
