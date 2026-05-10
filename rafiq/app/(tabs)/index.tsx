import React from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { PrayerHeader } from '../../src/components/home/PrayerHeader';
import { QuickGrid } from '../../src/components/home/QuickGrid';
import { CategoryGrid } from '../../src/components/home/CategoryGrid';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Spacing } from '../../src/constants/spacing';
import { Colors } from '../../src/constants/colors';
import { FontSizes } from '../../src/constants/typography';

export default function HomeScreen() {
  const handleItemPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScreenWrapper headerComponent={<PrayerHeader />}>
      <QuickGrid onItemPress={handleItemPress} />
      <ArabicText style={styles.sectionHeader}>تصفح المحتوى</ArabicText>
      <CategoryGrid onItemPress={handleItemPress} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: FontSizes.headingSm,
    color: Colors.gray900,
    marginHorizontal: Spacing.s4,
    marginTop: Spacing.s4,
    marginBottom: Spacing.s3,
  },
});