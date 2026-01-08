/**
 * EditSubscriptionScreen.tsx
 * 
 * Main screen component for editing subscription details.
 * This screen allows users to:
 * - Select an app for the subscription
 * - Set the subscription amount
 * - Choose a category
 * - Set start date, frequency, and reminder preferences
 * - Toggle subscription active status
 * - Delete the subscription
 * 
 * The screen uses multiple modal components for user interactions and maintains
 * local state for all subscription fields.
 */

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { App, Category, Frequency, RemindMeOption } from '../types';
import { APPS, CATEGORIES, FREQUENCIES, REMIND_ME_OPTIONS } from '../constants';
import { Colors } from '../constants/colors';
import { Texts } from '../constants/texts';
import { formatCurrency } from '../utils';
import {
  AmountInputModal,
  AppSelectionModal,
  Card,
  CategorySelectionModal,
  DatePickerModal,
  DatePickerRow,
  Divider,
  DropdownRow,
  Header,
  Icon,
  SelectionModal,
  Text,
  ToggleRow,
} from '../components';

/**
 * EditSubscriptionScreen Component
 * 
 * Main screen for editing subscription information.
 * Manages all subscription-related state and renders the UI with modals for selections.
 * 
 * @returns {JSX.Element} The edit subscription screen UI
 */
export const EditSubscriptionScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [amount, setAmount] = useState<string>('0.00');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(2025, 3, 12),
  ); // Apr 12, 2025
  const [frequency, setFrequency] = useState<Frequency | null>('Weekly');
  const [remindMe, setRemindMe] = useState<RemindMeOption | null>(
    '2 days before',
  );
  const [active, setActive] = useState<boolean>(true);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);
  const [showRemindMeModal, setShowRemindMeModal] = useState(false);

  /**
   * Handles the delete subscription action.
   * Currently logs to console - to be implemented with actual delete logic.
   */
  const handleDelete = () => {
    // TODO: Implement delete subscription logic
    console.log('Delete subscription');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <Header selectedApp={selectedApp} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* App Selection Card */}
        <Card style={[styles.card, styles.appCard]}>
          <View style={styles.appCardContent}>
            <Icon
              iconName={selectedApp?.iconName || 'ChooseAnApp'}
              size={50}
            />
            <View style={styles.appCardText}>
              <Text
                style={[
                  styles.appCardName,
                  selectedApp && styles.appCardNameSelected,
                ]}
              >
                {selectedApp?.name || Texts.chooseAnApp}
              </Text>
              <Text style={[styles.appCardAmount]}>
                {selectedApp ? formatCurrency(amount) : Texts.defaultAmount}
              </Text>
            </View>
          </View>
        </Card>

        {/* Subscription Details Card */}
        <Card style={styles.card}>
          <DropdownRow
            label={Texts.labelApp}
            value={selectedApp?.name || ''}
            onPress={() => setShowAppModal(true)}
          />
          <Divider />
          <TouchableOpacity
            onPress={() => setShowAmountModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.amountRow}>
              <Text style={styles.label}>{Texts.labelAmount}</Text>
              <Text style={styles.amountValue}>{formatCurrency(amount)}</Text>
            </View>
          </TouchableOpacity>
          <Divider />
          <DropdownRow
            label={Texts.labelCategory}
            placeholder={Texts.chooseAnCategory}
            value={selectedCategory?.name || ''}
            onPress={() => setShowCategoryModal(true)}
            rightComponent={
              selectedCategory && selectedCategory.icon ? (
                <Icon
                  iconName={selectedCategory.icon}
                  size={18}
                />
              ) : null
            }
          />
        </Card>

        {/* Schedule & Status Card */}
        <Card style={styles.card}>
          <DatePickerRow
            label={Texts.labelStartDate}
            value={startDate}
            onPress={() => setShowDatePickerModal(true)}
          />
          <Divider />
          <DropdownRow
            label={Texts.labelFrequency}
            value={frequency || ''}
            onPress={() => setShowFrequencyModal(true)}
          />
          <Divider />
          <DropdownRow
            label={Texts.labelRemindMe}
            value={remindMe || ''}
            onPress={() => setShowRemindMeModal(true)}
          />
          <Divider />
          <ToggleRow label={Texts.labelActive} value={active} onValueChange={setActive} />
        </Card>

        {/* Delete Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>{Texts.delete}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* App Selection Modal */}
      <AppSelectionModal
        visible={showAppModal}
        apps={APPS}
        selectedApp={selectedApp}
        onSelect={setSelectedApp}
        onClose={() => setShowAppModal(false)}
      />

      {/* Category Selection Modal */}
      <CategorySelectionModal
        visible={showCategoryModal}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
        onClose={() => setShowCategoryModal(false)}
      />

      {/* Date Picker Modal */}
      <DatePickerModal
        visible={showDatePickerModal}
        selectedDate={startDate}
        onSelect={setStartDate}
        onClose={() => setShowDatePickerModal(false)}
      />

      {/* Amount Input Modal */}
      <AmountInputModal
        visible={showAmountModal}
        amount={amount}
        onAmountChange={setAmount}
        onClose={() => setShowAmountModal(false)}
      />

      {/* Frequency Selection Modal */}
      <SelectionModal
        visible={showFrequencyModal}
        title={Texts.modalFrequency}
        items={FREQUENCIES}
        selectedItem={frequency}
        onSelect={setFrequency}
        onClose={() => setShowFrequencyModal(false)}
        getItemLabel={item => item}
        getItemId={item => item}
        height={257}
      />

      {/* Remind Me Selection Modal */}
      <SelectionModal
        visible={showRemindMeModal}
        title={Texts.modalRemindMe}
        items={REMIND_ME_OPTIONS}
        selectedItem={remindMe}
        onSelect={setRemindMe}
        onClose={() => setShowRemindMeModal(false)}
        getItemLabel={item => item}
        getItemId={item => item}
        height={270}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollView: {
    flex: 1,
  },
  card:{
    marginTop:16,
    paddingVertical:0
  },
  appCard:{
    paddingVertical:16
  },
  appCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appCardText: {
    marginLeft: 16,
    flex: 1,
  },
  appCardName: {
    fontSize: 18,
    color: Colors.textTertiary,
    marginBottom: 4,
  },
  appCardNameSelected: {
    fontWeight: '500',
    fontFamily:'Graphik-Medium-Trial',
    color: Colors.textPrimary,
  },
  appCardAmount: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textPrimary,
  },
  deleteButton: {
    backgroundColor: Colors.backgroundWhite,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 32,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth:1,
    borderColor: Colors.borderDelete,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily:'Graphik-Medium-Trial',
    color: Colors.error,
  },
});
