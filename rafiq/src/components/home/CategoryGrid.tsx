import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ArabicText } from '../shared/ArabicText';
import { Spacing } from '../../constants/spacing';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { MaterialIcons } from '@expo/vector-icons';

export interface Category {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
}

export const CATEGORIES: Category[] = [
  { id: 'quran', label: 'القرآن الكريم', icon: 'menu-book', route: '/(tabs)/quran' },
  { id: 'azkar', label: 'الأذكار', icon: 'auto-stories', route: '/(tabs)/azkar' },
  { id: 'duas', label: 'الدعاة', icon: 'forum', route: '/(tabs)/duas' },
  { id: 'qibla', label: 'القبلة', icon: 'explore', route: '/(tabs)/qibla' },
  { id: 'prayer', label: 'أوقات الصلاة', icon: 'access-time', route: '/(tabs)/prayer' },
  { id: 'ruqyah', label: 'الرقية الشرعية', icon: 'healing', route: '/(tabs)/ruqyah' },
  { id: 'tasbih', label: 'التسبيح', icon: 'casino', route: '/(tabs)/tasbih' },
  { id: 'calendar', label: 'التقويم الهجري', icon: 'calendar-today', route: '/(tabs)/calendar' },
  { id: 'more', label: 'المزيد', icon: 'more-horiz', route: '/(tabs)/more' },
  { id: 'settings', label: 'الإعدادات', icon: 'settings', route: '/(tabs)/settings' },
];

interface CategoryGridProps {
  onItemPress?: (route: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onItemPress }) => {
  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onItemPress?.(item.route)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={item.icon} size={28} color={Colors.green600} />
      </View>
      <ArabicText style={styles.label}>{item.label}</ArabicText>
    </TouchableOpacity>
  );

  return (
    <FlashList
      data={CATEGORIES}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      estimatedItemSize={80}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.s4,
  },
  item: {
    flex: 1,
    margin: Spacing.s2,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusMd,
    padding: Spacing.s4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: Spacing.radiusMd,
    backgroundColor: Colors.green100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s2,
  },
  label: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
    textAlign: 'center',
  },
});