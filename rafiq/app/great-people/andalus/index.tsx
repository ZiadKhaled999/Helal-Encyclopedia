import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../../src/components/shared/BackHeader';
import { ArabicText } from '../../../src/components/shared/ArabicText';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import greatPeopleAndalus, { GreatPersonAndalus } from '../../../src/data/great-people-andalus';

export default function GreatPeopleAndalusListScreen() {
  const renderItem = ({ item }: { item: GreatPersonAndalus }) => (
    <Link href={`/great-people/andalus/${item.id}` as any} asChild>
      <TouchableOpacity style={styles.card}>
        <ArabicText variant="ui" style={styles.cardTitle}>
          {item.name}
        </ArabicText>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScreenWrapper headerComponent={<BackHeader title="العظماء في الأندلس" />}>
      <View style={styles.container}>
        <FlashList
          data={greatPeopleAndalus}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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