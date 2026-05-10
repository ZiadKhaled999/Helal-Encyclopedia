import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';

interface Category {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

const CATEGORIES: Category[] = [
  { id: 'morning', label: 'أذكار الصباح', icon: 'wb-sunny', color: Colors.gold },
  { id: 'evening', label: 'أذكار المساء', icon: 'nights-stay', color: Colors.green700 },
];

export default function AzkarScreen() {
  const handleCategoryPress = (categoryId: string) => {
    router.push(`/azkar/${categoryId}` as any);
  };

  const handleCounterPress = () => {
    router.push('/azkar/counter' as any);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.7}
    >
      <Card style={styles.card} shadow="sm" radius="lg">
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
            <MaterialIcons name={item.icon} size={32} color={item.color} />
          </View>
          <ArabicText style={styles.categoryLabel}>{item.label}</ArabicText>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper headerComponent={<BackHeader title="الأذكار" />}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.counterCard}
          onPress={handleCounterPress}
          activeOpacity={0.7}
        >
          <Card style={styles.card} shadow="sm" radius="lg">
            <View style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: `${Colors.green600}20` }]}>
                <MaterialIcons name="casino" size={32} color={Colors.green600} />
              </View>
              <ArabicText style={styles.counterLabel}>التسبيح الرقمي</ArabicText>
            </View>
          </Card>
        </TouchableOpacity>

        <ArabicText style={styles.sectionTitle}>الأذكار اليومية</ArabicText>

        <FlashList
          data={CATEGORIES}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          estimatedItemSize={120}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FontSizes.headingMd,
    color: Colors.gray900,
    marginHorizontal: Spacing.s4,
    marginTop: Spacing.s4,
    marginBottom: Spacing.s3,
  },
  list: {
    paddingHorizontal: Spacing.s4,
  },
  categoryCard: {
    flex: 1,
    margin: Spacing.s2,
  },
  counterCard: {
    marginHorizontal: Spacing.s4,
  },
  card: {
    width: '100%',
  },
  cardContent: {
    alignItems: 'center',
    padding: Spacing.s4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: Spacing.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s2,
  },
  categoryLabel: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
    textAlign: 'center',
  },
  counterLabel: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
    textAlign: 'center',
  },
});