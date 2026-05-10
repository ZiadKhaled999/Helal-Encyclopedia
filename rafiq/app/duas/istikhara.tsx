import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';

const istikharaText = `اللهم إني أستخير بك من فضلك وعلمك، فإني قد جعلت خطتي وعمري ومالي وولي في ذرعي، وقد أخذت بيدي، وما رزقتني إلا خيرًا وعدلًا.

اللهم إن كنت تعلم أن هذا الأمر خيرًا لي في ديني ودنياي وآخرتي، وفي عاطفتي ومالي وولي، فيُسرِّه لي ويَقدِّره لي ذلك، ويبارك فيه لي، ثمّ توفّقني إليه وبارك لي فيه إذا حصل لي.

وإن كنت تعلم أن هذا الأمر ليس خيرًا لي في ديني ودنياي وآخرتي، وفي عاطفتي ومالي وولي، فاصرفه عني واصرفني عنه، واخلف لي خيرًا منه، وانصرف بما ترضى، ولا تبقِ لي إلا ما رضيتَ بقدرته علي، إنك ترضى وتراحِم.`;

export default function IstikharaScreen() {
  return (
    <ScreenWrapper headerComponent={<BackHeader title="دعاء الاستخارة" />}>
      <ScrollView style={styles.container}>
        <Card style={styles.duaCard} shadow="sm">
          <ArabicText style={styles.headerTitle}>دعاء الاستخارة</ArabicText>
          <ArabicText variant="quran" style={styles.duaArabic}>
            {istikharaText}
          </ArabicText>
          <ArabicText style={styles.instruction}>
            يُستحب قراءة دعاء الاستخارة قبل النوم، ثم صلاة ربع حجة بالوضوء
          </ArabicText>
        </Card>
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
  },
  headerTitle: {
    fontSize: FontSizes.headingMd,
    color: Colors.green700,
    marginBottom: Spacing.s4,
    fontWeight: '600',
    textAlign: 'center',
  },
  duaArabic: {
    fontSize: FontSizes.bodyLg,
    color: Colors.textArabic,
    lineHeight: 34,
    textAlign: 'right',
    marginBottom: Spacing.s4,
  },
  instruction: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray600,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingTop: Spacing.s4,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
});