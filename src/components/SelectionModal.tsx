/**
 * SelectionModal.tsx
 * 
 * Generic reusable modal component for selecting items from a list.
 * This is a generic component that can work with any item type.
 * 
 * Features:
 * - Generic type support for any item type
 * - Custom label and ID extraction functions
 * - Visual indication of selected item
 * - Empty state when no items available
 * - Optional custom height
 * 
 * Used for Frequency and Remind Me selections in EditSubscriptionScreen.
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from './Text';
import { BaseModal } from './BaseModal';
import { ModalListItem } from './ModalListItem';
import { Colors } from '../constants/colors';
import { Texts } from '../constants/texts';

interface SelectionModalProps<T> {
  /** Controls the visibility of the modal */
  visible: boolean;
  /** Title text displayed in the modal header */
  title: string;
  /** Array of items to choose from */
  items: T[];
  /** Currently selected item (null if none selected) */
  selectedItem: T | null;
  /** Callback function when an item is selected */
  onSelect: (item: T) => void;
  /** Callback function when modal is closed */
  onClose: () => void;
  /** Function to extract label string from item */
  getItemLabel: (item: T) => string;
  /** Function to extract unique ID string from item */
  getItemId: (item: T) => string;
  /** Optional fixed height for the modal */
  height?: number;
}

/**
 * SelectionModal Component
 * 
 * Generic modal component for selecting items from a list.
 * 
 * @template T - The type of items in the list
 * @param {SelectionModalProps<T>} props - The component props
 * @returns {JSX.Element} The selection modal UI
 */
export function SelectionModal<T>({
  visible,
  title,
  items,
  selectedItem,
  onSelect,
  onClose,
  getItemLabel,
  getItemId,
  height,
}: SelectionModalProps<T>) {
  /**
   * Handles item selection - calls onSelect callback and closes modal
   * 
   * @param {T} item - The selected item
   */
  const handleSelect = (item: T) => {
    onSelect(item);
    onClose();
  };

  /**
   * Renders a single item in the list
   * 
   * @param {Object} param0 - Render item params
   * @param {T} param0.item - The item to render
   * @returns {JSX.Element} The list item UI
   */
  const renderItem = ({ item }: { item: T }) => {
    const isSelected =
      selectedItem && getItemId(selectedItem) === getItemId(item);

    return (
      <ModalListItem
        label={getItemLabel(item)}
        isSelected={!!isSelected}
        onPress={() => handleSelect(item)}
        wrapperStyle={styles.wrapper}
        itemStyle={styles.item}
      />
    );
  };

  return (
    <BaseModal
      visible={visible}
      title={title}
      onClose={onClose}
      height={height}
    >
      {/* List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => getItemId(item)}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{Texts.emptyNoOptions}</Text>
          </View>
        }
      />
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    minHeight: 100,
  },
  listContent: {
    paddingBottom: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  wrapper: {
    paddingHorizontal: 0,
  },
  item: {
    paddingHorizontal: 16,
  },
});
