import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '../../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../../src/components/shared/BackHeader';
import { ArabicText } from '../../../src/components/shared/ArabicText';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import greatPeopleAndalus, { GreatPersonAndalus } from '../../../src/data/great-people-andalus';

export default function GreatPersonAndalusDetailScreen() {
  const { figureId } = useLocalSearchParams<{ figureId: string }>();
  const [item, setItem] = useState<GreatPersonAndalus | null>(null);

  useEffect(() => {
    const id = parseInt(figureId, 10);
    const found = greatPeopleAndalus.find((c) => c.id === id);
    if (found) {
      setItem(found);
    }
  }, [figureId]);

  if (!item) {
    return (
      <ScreenWrapper headerComponent={<BackHeader title="العظيم" />}>
        <View style={styles.emptyContainer} />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper headerComponent={<BackHeader title={item.name} />}>
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