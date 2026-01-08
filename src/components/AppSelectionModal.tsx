/**
 * AppSelectionModal.tsx
 * 
 * Modal component for selecting an app from a list of available apps.
 * Features:
 * - Search functionality to filter apps by name
 * - List of apps with icons
 * - Visual indication of selected app
 * - Empty state when no apps match search
 * 
 * Used in EditSubscriptionScreen for app selection.
 */

import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { App } from '../types';
import { Text } from './Text';
import { BaseModal } from './BaseModal';
import { ModalListItem } from './ModalListItem';
import { SearchInput } from './SearchInput';
import { Colors } from '../constants/colors';
import { Texts } from '../constants/texts';

interface AppSelectionModalProps {
  /** Controls the visibility of the modal */
  visible: boolean;
  /** Array of available apps to choose from */
  apps: App[];
  /** Currently selected app (null if none selected) */
  selectedApp: App | null;
  /** Callback function when an app is selected */
  onSelect: (app: App) => void;
  /** Callback function when modal is closed */
  onClose: () => void;
}

/**
 * AppSelectionModal Component
 * 
 * Renders a modal with search functionality and a list of apps for selection.
 * 
 * @param {AppSelectionModalProps} props - The component props
 * @returns {JSX.Element} The app selection modal UI
 */
export const AppSelectionModal: React.FC<AppSelectionModalProps> = ({
  visible,
  apps,
  selectedApp,
  onSelect,
  onClose,
}) => {
  // Search query state for filtering apps
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filters apps based on search query (case-insensitive)
   */
  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  /**
   * Handles app selection - calls onSelect callback and closes modal
   * 
   * @param {App} app - The selected app
   */
  const handleSelect = (app: App) => {
    onSelect(app);
    onClose();
  };

  /**
   * Renders a single app item in the list
   * 
   * @param {Object} param0 - Render item params
   * @param {App} param0.item - The app item to render
   * @returns {JSX.Element} The app list item UI
   */
  const renderAppItem = ({ item }: { item: App }) => {
    const isSelected = selectedApp?.id === item.id;

    return (
      <ModalListItem
        label={item.name}
        iconName={item.iconName || undefined}
        iconSize={40}
        isSelected={isSelected}
        onPress={() => handleSelect(item)}
      />
    );
  };

  return (
    <BaseModal visible={visible} title={Texts.modalApp} onClose={onClose} height={585}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <SearchInput
          iconName="Search"
          placeholder={Texts.placeholderSearch}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* App List */}
      <FlatList
        data={filteredApps}
        renderItem={renderAppItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{Texts.emptyNoApps}</Text>
          </View>
        }
      />
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
    minHeight: 300,
  },
  listContent: {
    paddingBottom: 8,
    backgroundColor: Colors.backgroundWhite,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
