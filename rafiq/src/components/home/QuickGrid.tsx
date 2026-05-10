import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArabicText } from '../shared/ArabicText';
import { Spacing } from '../../constants/spacing';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { MaterialIcons } from '@expo/vector-icons';

interface QuickItem {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
}

const QUICK_ITEMS: QuickItem[] = [
  { id: 'quran', label: 'القرآن', icon: 'menu-book', route: '/(tabs)/quran' },
  { id: 'azkar', label: 'الأذكار', icon: 'auto-stories', route: '/(tabs)/azkar' },
  { id: 'duas', label: 'الدعاة', icon: 'forum', route: '/(tabs)/duas' },
  { id: 'qibla', label: 'القبلة', icon: 'explore', route: '/(tabs)/qibla' },
];

interface QuickGridProps {
  onItemPress?: (route: string) => void;
}

export const QuickGrid: React.FC<QuickGridProps> = ({ onItemPress }) => {
  return (
    <View style={styles.container}>
      {QUICK_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => onItemPress?.(item.route)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name={item.icon} size={24} color={Colors.green600} />
          </View>
          <ArabicText style={styles.label}>{item.label}</ArabicText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.s4,
    marginTop: Spacing.s4,
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Spacing.radiusLg,
    backgroundColor: Colors.green100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s2,
  },
  label: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray900,
    textAlign: 'center',
  },
});