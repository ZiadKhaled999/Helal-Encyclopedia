import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '../../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../../src/components/shared/BackHeader';
import { ArabicText } from '../../../src/components/shared/ArabicText';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import characterItems, { CharacterItem } from '../../../src/data/prophet-character';

export default function CharacterDetailScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const [item, setItem] = useState<CharacterItem | null>(null);

  useEffect(() => {
    const found = characterItems.find((c) => c.id === chapterId);
    if (found) {
      setItem(found);
    }
  }, [chapterId]);

  if (!item) {
    return (
      <ScreenWrapper headerComponent={<BackHeader title="الفصل" />}>
        <View style={styles.emptyContainer} />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper headerComponent={<BackHeader title={item.title} />}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ArabicText variant="ui" style={styles.content}>
          {item.content || 'المحتوى قيد التحميل...'}
        </ArabicText>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.s4,
  },
  emptyContainer: {
    flex: 1,
  },
  content: {
    fontSize: 18,
    lineHeight: 32,
    color: Colors.gray900,
  },
});