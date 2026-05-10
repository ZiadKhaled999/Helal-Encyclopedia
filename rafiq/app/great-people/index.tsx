import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { router } from 'expo-router';

export default function GreatPeopleIndexScreen() {
  return (
    <ScreenWrapper headerComponent={<BackHeader title="العظماء الإسلاميون" />}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/great-people/list')}
        >
          <ArabicText variant="ui" style={styles.cardTitle}>
            أعظم 100 رجل في الإسلام
          </ArabicText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/great-people/andalus')}
        >
          <ArabicText variant="ui" style={styles.cardTitle}>
            العظماء في الأندلس
          </ArabicText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.s4,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusMd,
    padding: Spacing.s5,
    marginBottom: Spacing.s4,
    borderWidth: 1,
    borderColor: Colors.green100,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: Colors.gray900,
    fontWeight: '600',
  },
});