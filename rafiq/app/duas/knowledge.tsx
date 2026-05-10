import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';

const knowledgeDuas = [
  {
    title: 'دعاء طلب العلم',
    arabic: 'اللهم إني أسألك علمًا نافعًا وعملًا صالحًا وذكرًا ذا فائدة',
    translation: 'اللهم إني أسألك علمًا نافعًا وعملًا صالحًا',
  },
  {
    title: 'دعاء فهم القرآن',
    arabic: 'ربي زدني علماً وعفواً وتقواً وعلمني أحكم ما توفيقني إليه',
    translation: 'ارزقني علمًا وتقوى وعلمني حكمة',
  },
  {
    title: 'دعاء المذاكرة',
    arabic: 'يا من يريح قلبي بفهم الكتابة، اجعلني من العلماء',
    translation: 'اللهم اجعلني من الذين يفهمون العلم',
  },
];

export default function KnowledgeScreen() {
  return (
    <ScreenWrapper headerComponent={<BackHeader title="دعاء للعلم" />}>
      <ScrollView style={styles.container}>
        {knowledgeDuas.map((dua, index) => (
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