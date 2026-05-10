import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';

const deceasedDuas = [
  {
    title: 'دعاء للميت',
    arabic: 'اللهم اغفر له وارحَمه وعافِه واعفُ عنه وعطِف عليه',
    translation: 'اللهم اغفر له وارحَمه',
  },
  {
    title: 'السلام عليك',
    arabic: 'السلام عليك ورحمة الله وبركاته. اللهم اغفر له وارحمه',
    translation: 'السلام عليك ورحمة الله',
  },
  {
    title: 'دعاء التوسل',
    arabic: 'اللهم اجعل قبره راحةً واجعل ذلك له في قبرةٍ رحمةً',
    translation: 'اللهم اجعل قبره راحة',
  },
];

export default function DeceasedScreen() {
  return (
    <ScreenWrapper headerComponent={<BackHeader title="دعاء للمتوفي" />}>
      <ScrollView style={styles.container}>
        {deceasedDuas.map((dua, index) => (
          <Card key={index} style={styles.duaCard} shadow="sm">
            <ArabicText style={styles.duaTitle}>{dua.title}</ArabicText>
            <ArabicText variant="quran" style={styles.duaArabic}>
              {dua.arabic}
            </ArabicText>
            <ArabicText style={styles.duaTranslation}>{dua.translation}</ArabicText>
          </Card>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
  },
  duaCard: {
    padding: Spacing.s5,
    marginBottom: Spacing.s4,
  },
  duaTitle: {
    fontSize: FontSizes.headingSm,
    color: Colors.green700,
    marginBottom: Spacing.s3,
    fontWeight: '600',
  },
  duaArabic: {
    fontSize: FontSizes.bodyLg,
    color: Colors.textArabic,
    lineHeight: 32,
    marginBottom: Spacing.s3,
    textAlign: 'right',
  },
  duaTranslation: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray600,
    fontStyle: 'italic',
  },
});