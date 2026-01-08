/**
 * CategorySelectionModal.tsx
 * 
 * Modal component for selecting a category from a list of available categories.
 * Features:
 * - List of categories with icons
 * - Visual indication of selected category
 * - Dividers between category items
 * - Empty state when no categories available
 * 
 * Used in EditSubscriptionScreen for category selection.
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Category } from '../types';
import { Divider } from './Divider';
import { BaseModal } from './BaseModal';
import { ModalListItem } from './ModalListItem';
import { Text } from './Text';
import { Colors } from '../constants/colors';
import { Texts } from '../constants/texts';

interface CategorySelectionModalProps {
  /** Controls the visibility of the modal */
  visible: boolean;
  /** Array of available categories to choose from */
  categories: Category[];
  /** Currently selected category (null if none selected) */
  selectedCategory: Category | null;
  /** Callback function when a category is selected */
  onSelect: (category: Category) => void;
  /** Callback function when modal is closed */
  onClose: () => void;
}

/**
 * CategorySelectionModal Component
 * 
 * Renders a modal with a list of categories for selection.
 * 
 * @param {CategorySelectionModalProps} props - The component props
 * @returns {JSX.Element} The category selection modal UI
 */
export const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  visible,
  categories,
  selectedCategory,
  onSelect,
  onClose,
}) => {
  /**
   * Handles category selection - calls onSelect callback and closes modal
   * 
   * @param {Category} category - The selected category
   */
  const handleSelect = (category: Category) => {
    onSelect(category);
    onClose();
  };

  /**
   * Renders a single category item in the list with divider
   * 
   * @param {Object} param0 - Render item params
   * @param {Category} param0.item - The category item to render
   * @param {number} param0.index - The index of the item in the list
   * @returns {JSX.Element} The category list item UI with optional divider
   */
  const renderCategoryItem = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    const isSelected = selectedCategory?.id === item.id;

    return (
      <>
        <ModalListItem
          label={item.name}
          iconName={item.icon || undefined}
          iconSize={20}
          isSelected={isSelected}
          onPress={() => handleSelect(item)}
          iconContainerStyle={styles.categoryIconContainer}
        />
        {/* Render divider between items, but not after the last item */}
        {index !== categories?.length - 1 && (
          <Divider style={styles.divider} />
        )}
      </>
    );
  };

  return (
    <BaseModal
      visible={visible}
      title={Texts.modalCategory}
      onClose={onClose}
      height={373}
    >
      {/* Category List */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{Texts.emptyNoCategories}</Text>
          </View>
        }
      />
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    minHeight: 200,
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
  categoryIconContainer: {
    backgroundColor: Colors.backgroundGray,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
  divider: {
    marginVertical: 5,
  },
});
