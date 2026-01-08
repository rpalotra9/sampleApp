/**
 * constants/index.ts
 * 
 * Centralized application constants.
 * Contains all static data used throughout the application:
 * - Apps list
 * - Categories list
 * - Frequency options
 * - Remind Me options
 * 
 * This file serves as a single source of truth for all application data.
 */

import { App, Category, Frequency, RemindMeOption } from '../types';

/**
 * Available apps for subscription selection
 */
export const APPS: App[] = [
  { id: '1', name: 'Netflix', iconName: 'Netflix' },
  { id: '2', name: 'Spotify', iconName: 'Spotify' },
  { id: '3', name: 'New York Times', iconName: 'NewYorkTimes' },
  { id: '4', name: 'Wall Street Journal', iconName: 'WallStreetJournal' },
  { id: '5', name: 'Hulu', iconName: 'Hulu' },
  { id: '6', name: 'Apple', iconName: 'Apple' },
  { id: '7', name: 'Amazon', iconName: 'Amazon' },
];

/**
 * Available categories for subscription classification
 */
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Subscription', icon: 'Subscription' },
  { id: '2', name: 'Utility', icon: 'Utility' },
  { id: '3', name: 'Card Payment', icon: 'CardPayment' },
  { id: '4', name: 'Loan', icon: 'Loan' },
  { id: '5', name: 'Rent', icon: 'Rent' },
];

/**
 * Available frequency options for subscription billing
 */
export const FREQUENCIES: Frequency[] = ['Weekly', 'Monthly', 'Annually'];

/**
 * Available reminder options for subscription notifications
 */
export const REMIND_ME_OPTIONS: RemindMeOption[] = [
  '1 day before',
  '2 days before',
  '3 days before',
  '1 week before',
];

