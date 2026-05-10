import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { AzkarCard, AzkarItem } from '../../src/components/azkar/AzkarCard';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import azkarData from '../../src/data/azkar-main.json';

interface CategoryData {
  id: number;
  category: string;
  icon: string;
  array: AzkarItem[];
}

export default function AzkarCategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [categoryTitle, setCategoryTitle] = useState('الأذكار');

  useEffect(() => {
    if (categoryId && azkarData[categoryId as keyof typeof azkarData]) {
      const data = azkarData[categoryId as keyof typeof azkarData] as CategoryData;
      setCategory(data);
      setCategoryTitle(data.category);
    }
  }, [categoryId]);

  const renderItem = ({ item }: { item: AzkarItem }) => (
    <AzkarCard item={item} />
  );

  return (
    <ScreenWrapper headerComponent={<BackHeader title={categoryTitle} />}>
      <View style={styles.container}>
        {category ? (
          <FlashList
            data={category.array}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={150}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <BackHeader title="الأذكار" />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: Spacing.s4,
  },
  emptyContainer: {
    flex: 1,
  },
});