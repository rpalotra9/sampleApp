/**
 * BaseModal.tsx
 * 
 * Reusable base modal component that provides a consistent structure for all modals
 * in the application. This component includes:
 * - Backdrop overlay with tap-to-close functionality
 * - Modal handle for visual indication
 * - Centered header with title and "Done" button
 * - Keyboard avoiding view support for input modals
 * 
 * This component eliminates code duplication across all modal implementations
 * and ensures consistent UI/UX throughout the app.
 */

import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
} from 'react-native';
import { Text } from './Text';
import { Colors } from '../constants/colors';
import { Texts } from '../constants/texts';

interface BaseModalProps {
  /** Controls the visibility of the modal */
  visible: boolean;
  /** Title text displayed in the modal header */
  title: string;
  /** Callback function called when modal is closed */
  onClose: () => void;
  /** Content to be rendered inside the modal */
  children: React.ReactNode;
  /** Optional custom styles for the modal content container */
  contentStyle?: StyleProp<ViewStyle>;
  /** Optional fixed height for the modal content */
  height?: number;
  /** Whether to use KeyboardAvoidingView for keyboard handling */
  useKeyboardAvoidingView?: boolean;
}

/**
 * BaseModal Component
 * 
 * A reusable modal component that provides consistent structure and behavior
 * for all bottom sheet modals in the application.
 * 
 * @param {BaseModalProps} props - The component props
 * @returns {JSX.Element} The base modal UI
 */
export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  title,
  onClose,
  children,
  contentStyle,
  height,
  useKeyboardAvoidingView = false,
}) => {
  /**
   * Renders the modal content including backdrop, handle, header, and children.
   * This is extracted to avoid duplication between KeyboardAvoidingView and regular View.
   */
  const content = (
    <>
      {/* Backdrop overlay - tapping closes the modal */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      
      {/* Modal content container */}
      <View style={[styles.modalContent, contentStyle, height !== undefined && { height }]}>
        {/* Visual handle indicator for bottom sheet */}
        <View style={styles.handle} />

        {/* Header section with centered title and right-aligned Done button */}
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.headerRight}>
            <Text style={styles.doneButton}>{Texts.done}</Text>
          </TouchableOpacity>
        </View>

        {/* Modal content - passed as children */}
        {children}
      </View>
    </>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Conditionally wrap content in KeyboardAvoidingView for input modals */}
      {useKeyboardAvoidingView ? (
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.modalContainer}>{content}</View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.modalBackdrop,
  },
  modalContent: {
    backgroundColor: Colors.backgroundWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: Colors.modalHandleDark,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  doneButton: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
});
