import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../../src/components/shared/BackHeader';
import { ArabicText } from '../../../src/components/shared/ArabicText';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import invasions, { Invasion } from '../../../src/data/prophet-invasions';

export default function InvasionsListScreen() {
  const renderItem = ({ item }: { item: Invasion }) => (
    <Link href={`/prophet/invasions/${item.id}` as any} asChild>
      <TouchableOpacity style={styles.card}>
        <ArabicText variant="ui" style={styles.cardTitle}>
          {item.title}
        </ArabicText>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScreenWrapper headerComponent={<BackHeader title="غزوات النبي" />}>
      <View style={styles.container}>
        <FlashList
          data={invasions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          estimatedItemSize={80}
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
  list: {
    paddingBottom: Spacing.s4,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusMd,
    padding: Spacing.s4,
    marginBottom: Spacing.s3,
    borderWidth: 1,
    borderColor: Colors.green100,
  },
  cardTitle: {
    fontSize: 16,
    color: Colors.gray900,
  },
});