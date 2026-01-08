/**
 * DatePickerModal.tsx
 * 
 * Modal component for selecting a date with platform-specific implementations.
 * 
 * iOS: Uses native DateTimePicker with spinner display for consistent iOS UX.
 * Android: Uses custom wheel picker built with ScrollView for iOS-like experience.
 * 
 * Features:
 * - Platform-specific date picker UI
 * - Date validation
 * - Automatic day adjustment when month/year changes
 * - Scroll position management for Android wheel picker
 * 
 * Used in EditSubscriptionScreen for start date selection.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from './Text';
import { BaseModal } from './BaseModal';
import { Colors } from '../constants/colors';
import { Texts } from '../constants/texts';
import { getDaysInMonth, getYears } from '../utils';

interface DatePickerModalProps {
  /** Controls the visibility of the modal */
  visible: boolean;
  /** Currently selected date (null if no date selected) */
  selectedDate: Date | null;
  /** Callback function when a date is selected */
  onSelect: (date: Date) => void;
  /** Callback function when modal is closed */
  onClose: () => void;
}

/** Array of month names for display */
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


/**
 * DatePickerModal Component
 * 
 * Renders a platform-specific date picker modal.
 * 
 * @param {DatePickerModalProps} props - The component props
 * @returns {JSX.Element} The date picker modal UI
 */
export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  selectedDate,
  onSelect,
  onClose,
}) => {
  // iOS: Single date state for native picker
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  // Android: Separate state for month, day, year (for custom wheel picker)
  const initialDate = selectedDate || new Date();
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

  // Refs for Android wheel picker scroll views
  const monthScrollRef = useRef<any>(null);
  const dayScrollRef = useRef<any>(null);
  const yearScrollRef = useRef<any>(null);

  // Generate years array and calculate days in selected month
  const years = getYears();
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  /**
   * Adjusts selected day if it exceeds days in the selected month
   * and updates scroll position for Android wheel picker
   */
  useEffect(() => {
    if (selectedDay > daysInMonth) {
      const newDay = daysInMonth;
      setSelectedDay(newDay);
      // Update scroll position for days wheel
      setTimeout(() => {
        dayScrollRef.current?.scrollTo({
          y: (newDay - 1) * 40,
          animated: true,
        });
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysInMonth]);

  /**
   * Syncs internal state when selectedDate prop changes
   */
  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
      setSelectedMonth(selectedDate.getMonth());
      setSelectedDay(selectedDate.getDate());
      setSelectedYear(selectedDate.getFullYear());
    } else {
      const today = new Date();
      setCurrentDate(today);
      setSelectedMonth(today.getMonth());
      setSelectedDay(today.getDate());
      setSelectedYear(today.getFullYear());
    }
  }, [selectedDate]);

  /**
   * Scrolls Android wheel pickers to selected positions when modal opens
   */
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        monthScrollRef.current?.scrollTo({
          y: selectedMonth * 40,
          animated: false,
        });
        dayScrollRef.current?.scrollTo({
          y: (selectedDay - 1) * 40,
          animated: false,
        });
        const yearIndex = years.findIndex(y => y === selectedYear);
        if (yearIndex !== -1) {
          yearScrollRef.current?.scrollTo({
            y: yearIndex * 40,
            animated: false,
          });
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, selectedMonth, selectedDay, selectedYear]);

  /**
   * Handles date change from iOS native picker
   * 
   * @param {any} event - The change event
   * @param {Date | undefined} date - The selected date
   */
  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setCurrentDate(date);
    }
  };

  /**
   * Handles done button press - validates and returns selected date
   */
  const handleDone = () => {
    if (Platform.OS === 'ios') {
      // Validate currentDate before using
      if (currentDate && !isNaN(currentDate.getTime())) {
        onSelect(currentDate);
      } else {
        onSelect(new Date());
      }
    } else {
      // Validate date before creating
      const newDate = new Date(selectedYear, selectedMonth, selectedDay);
      if (!isNaN(newDate.getTime())) {
        onSelect(newDate);
      } else {
        onSelect(new Date());
      }
    }
    onClose();
  };

  /**
   * Renders a custom wheel picker for Android
   * 
   * @param {Array<string | number>} items - Array of items to display in the wheel
   * @param {number} selectedIndex - Currently selected item index
   * @param {(index: number) => void} onSelect - Callback when item is selected
   * @param {React.RefObject<ScrollView>} scrollRef - Ref to the ScrollView
   * @returns {JSX.Element} The wheel picker UI
   */
  const renderWheel = (
    items: (string | number)[],
    selectedIndex: number,
    onSelect: (index: number) => void,
    scrollRef: React.RefObject<ScrollView>,
  ) => {
    const itemHeight = 40;
    const visibleItems = 5;
    const wheelHeight = itemHeight * visibleItems;

    return (
      <View style={[styles.wheelContainer, { height: wheelHeight }]}>
        <View style={styles.wheelSelection} />
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.wheelContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onMomentumScrollEnd={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const index = Math.round(offsetY / itemHeight);
            const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
            onSelect(clampedIndex);
          }}
        >
          {items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.wheelItem,
                {
                  height: itemHeight,
                },
              ]}
            >
              <Text
                style={[
                  styles.wheelItemText,
                  index === selectedIndex && styles.wheelItemTextSelected,
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <BaseModal visible={visible} title={Texts.modalStartDate} onClose={handleDone}>
      {Platform.OS === 'ios' ? (
        /* iOS: Use native DateTimePicker with spinner */
        <View style={styles.pickerContainerIOS}>
          <DateTimePicker
            value={currentDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            style={styles.picker}
              textColor={Colors.textPrimary}
          />
        </View>
      ) : (
        /* Android: Use custom wheel picker */
        <View style={styles.pickerContainer}>
          {renderWheel(
            MONTHS,
            selectedMonth,
            index => {
              setSelectedMonth(index);
              // Adjust day if it exceeds days in new month
              const newDaysInMonth = getDaysInMonth(index, selectedYear);
              if (selectedDay > newDaysInMonth) {
                setSelectedDay(newDaysInMonth);
              }
            },
            monthScrollRef,
          )}
          {renderWheel(
            days,
            selectedDay - 1,
            index => setSelectedDay(days[index]),
            dayScrollRef,
          )}
          {renderWheel(
            years,
            years.findIndex(y => y === selectedYear),
            index => {
              setSelectedYear(years[index]);
              // Adjust day if it exceeds days in new year's month
              const newDaysInMonth = getDaysInMonth(
                selectedMonth,
                years[index],
              );
              if (selectedDay > newDaysInMonth) {
                setSelectedDay(newDaysInMonth);
              }
            },
            yearScrollRef,
          )}
        </View>
      )}
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  pickerContainerIOS: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 200,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  picker: {
    width: '100%',
    height: 200,
  },
  wheelContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  wheelSelection: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: Colors.modalSelection,
    borderRadius: 8,
    zIndex: 1,
  },
  wheelContent: {
    paddingVertical: 80,
  },
  wheelItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelItemText: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  wheelItemTextSelected: {
    fontWeight: '500',
    color: Colors.textPrimary,
  },
});
