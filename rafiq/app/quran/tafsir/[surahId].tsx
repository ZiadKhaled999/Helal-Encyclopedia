import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '../../../src/components/shared/ScreenWrapper';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import { FontSizes, Fonts } from '../../../src/constants/typography';
import quranData from '../../../src/data/quran.json';

export default function TafsirScreen() {
  const { surahId } = useLocalSearchParams<{ surahId: string }>();
  const router = useRouter();

  const surah = quranData.find((s) => s.Number === parseInt(surahId));

  useEffect(() => {
    if (!surah) {
      router.replace('/(tabs)/quran');
    }
  }, [surah, router]);

  if (!surah) {
    return null;
  }

  const headerComponent = (
    <View style={styles.header}>
      <Text style={styles.title}>Tafsir</Text>
      <Text style={styles.surahName}>{surah.Name}</Text>
    </View>
  );

  return (
    <ScreenWrapper headerComponent={headerComponent}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.body}>
          {surah.English_Name} is the {surahId} chapter of the Quran, consisting of {surah.Number_Verses} verses.
          It was revealed in {surah.Descent.toLowerCase() === 'مكية' ? 'Mecca' : 'Medina'}.
        </Text>

        <Text style={styles.sectionTitle}>Key Themes</Text>
        <Text style={styles.body}>
          This surah primarily discusses divine guidance, faith, and the relationship between
          humanity and Allah. The verses emphasize the importance of worship, righteous deeds,
          and following the straight path.
        </Text>

        <Text style={styles.sectionTitle}>Verse-by-Verse Explanation</Text>
        {surah.Array_Verses?.[0]?.map((verse, index) => (
          <View key={verse.id} style={styles.verseExplanation}>
            <Text style={styles.verseRef}>Verse {verse.id}</Text>
            <Text style={styles.verseText}>{verse.en}</Text>
            <Text style={styles.explanation}>
              This verse emphasizes the core message of faith and devotion to Allah,
              guiding believers to the straight path of righteousness.
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.s6,
    paddingTop: Spacing.s4,
    paddingBottom: Spacing.s2,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.headingLg,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.white,
  },
  surahName: {
    fontSize: FontSizes.headingSm,
    fontFamily: Fonts.arabicUIRegular,
    color: Colors.gray100,
    marginTop: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
  },
  sectionTitle: {
    fontSize: FontSizes.headingSm,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.textArabic,
    marginTop: Spacing.s4,
    marginBottom: Spacing.s2,
  },
  body: {
    fontSize: FontSizes.bodyMd,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
    lineHeight: 22,
  },
  verseExplanation: {
    marginTop: Spacing.s3,
    padding: Spacing.s3,
    backgroundColor: Colors.gray50,
    borderRadius: Spacing.radiusMd,
  },
  verseRef: {
    fontSize: FontSizes.label,
    fontFamily: Fonts.bodyMedium,
    color: Colors.green600,
  },
  verseText: {
    fontSize: FontSizes.bodyMd,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray900,
    marginVertical: Spacing.s2,
  },
  explanation: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
    lineHeight: 20,
  },
});