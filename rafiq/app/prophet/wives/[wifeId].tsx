import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '../../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../../src/components/shared/BackHeader';
import { ArabicText } from '../../../src/components/shared/ArabicText';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import wives, { Wife } from '../../../src/data/prophet-wives';

export default function WifeDetailScreen() {
  const { wifeId } = useLocalSearchParams<{ wifeId: string }>();
  const [item, setItem] = useState<Wife | null>(null);

  useEffect(() => {
    const found = wives.find((c) => c.id === wifeId);
    if (found) {
      setItem(found);
    }
  }, [wifeId]);

  if (!item) {
    return (
      <ScreenWrapper headerComponent={<BackHeader title="الزوجة" />}>
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