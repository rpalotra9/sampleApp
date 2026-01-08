/**
 * AmountInputModal.tsx
 *
 * Modal component for entering subscription amount.
 * Features:
 * - Numeric keypad input (decimal-pad)
 * - Dollar sign prefix
 * - Input validation (numeric and decimal point only)
 * - Keyboard avoiding view for proper keyboard handling
 * - Auto-focus on input when modal opens
 *
 * Used in EditSubscriptionScreen for amount input.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { BaseModal } from './BaseModal';
import { SearchInput } from './SearchInput';
import { Texts } from '../constants/texts';

interface AmountInputModalProps {
  /** Controls the visibility of the modal */
  visible: boolean;
  /** Current amount value */
  amount: string;
  /** Callback function when amount changes */
  onAmountChange: (amount: string) => void;
  /** Callback function when modal is closed */
  onClose: () => void;
}

/**
 * AmountInputModal Component
 *
 * Renders a modal with numeric input for subscription amount.
 *
 * @param {AmountInputModalProps} props - The component props
 * @returns {JSX.Element} The amount input modal UI
 */
export const AmountInputModal: React.FC<AmountInputModalProps> = ({
  visible,
  amount,
  onAmountChange,
  onClose,
}) => {
  // Local input value state
  const [inputValue, setInputValue] = useState('0');
  // Ref for TextInput to control focus
  const inputRef = useRef<TextInput>(null);

  /**
   * Syncs input value with amount prop and focuses input when modal opens
   */
  useEffect(() => {
    if (visible) {
      const value = amount;
      setInputValue(value);
      // Focus input when modal opens for better UX
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible, amount]);

  /**
   * Handles done button press - blurs input and closes modal
   */
  const handleDone = () => {
    inputRef.current?.blur();
    onClose();
  };

  /**
   * Handles text input changes with validation
   * - Removes non-numeric characters except decimal point
   * - Ensures only one decimal point
   *
   * @param {string} text - The input text
   */
  const handleChangeText = (text: string) => {
    // Remove any non-numeric characters except decimal point
    const cleanedText = text.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleanedText.split('.');
    const formattedText =
      parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleanedText;

    setInputValue(formattedText);
    onAmountChange(formattedText);
  };

  return (
    <BaseModal
      visible={visible}
      title={Texts.modalAmount}
      onClose={handleDone}
      height={220}
      useKeyboardAvoidingView={true}
      contentStyle={styles.modalContent}
    >
      {/* Amount Input Field */}
      <View style={styles.inputWrapper}>
        <SearchInput
          iconName="Dollar"
          ref={inputRef}
          value={inputValue}
          onChangeText={handleChangeText}
          keyboardType="decimal-pad"
          placeholder={Texts.placeholderAmount}
          autoFocus={true}
          containerStyle={styles.amountInputContainer}
        />
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    maxHeight: 250,
  },
  inputWrapper: {
    marginTop: 32,
  },
  amountInputContainer: {
    marginTop: 0,
  },
});
