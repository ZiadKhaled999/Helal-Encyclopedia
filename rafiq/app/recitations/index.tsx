import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes, Fonts } from '../../src/constants/typography';
import recitersData from '../../src/data/reciters.json';

interface Reciter {
  id: number;
  name: string;
  Server: string;
  rewaya: string;
  letter: string;
  count: string;
  suras: string;
}

const groupByLetter = (reciters: Reciter[]) => {
  const groups: Record<string, Reciter[]> = {};
  reciters.forEach((reciter) => {
    const letter = reciter.letter;
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(reciter);
  });
  return groups;
};

export default function RecitersListScreen() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  
  const { groupedReciters, letters } = useMemo(() => {
    const groups = groupByLetter(recitersData as Reciter[]);
    const letters = Object.keys(groups).sort();
    return { groupedReciters: groups, letters };
  }, []);

  const displayedReciters = selectedLetter 
    ? groupedReciters[selectedLetter] || []
    : recitersData as Reciter[];

  const renderReciter = ({ item }: { item: Reciter }) => (
    <TouchableOpacity
      style={styles.reciterCard}
      onPress={() => router.push(`/recitations/${item.id}`)}
    >
      <View style={styles.reciterInfo}>
        <ArabicText variant="ui" style={styles.reciterName}>
          {item.name}
        </ArabicText>
        <Text style={styles.rewaya}>{item.rewaya}</Text>
        <Text style={styles.count}>{parseInt(item.count, 10)} سورة</Text>
      </View>
    </TouchableOpacity>
  );

  const renderLetterButton = (letter: string) => (
    <TouchableOpacity
      key={letter}
      style={[
        styles.letterButton,
        selectedLetter === letter && styles.letterButtonSelected,
      ]}
      onPress={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
    >
      <Text
        style={[
          styles.letterText,
          selectedLetter === letter && styles.letterTextSelected,
        ]}
      >
        {letter}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper headerComponent={<BackHeader title="القراء" />}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>تصفية حسب الحرف:</Text>
          <FlashList
            data={letters}
            keyExtractor={(item) => item}
            renderItem={({ item }) => renderLetterButton(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.lettersContainer}
          />
        </View>

<FlashList
           data={displayedReciters}
           keyExtractor={(item) => item.id.toString()}
           renderItem={renderReciter}
           contentContainerStyle={styles.listContent}
           showsVerticalScrollIndicator={false}
         />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
  },
  filterContainer: {
    marginBottom: Spacing.s3,
  },
  filterLabel: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyMedium,
    color: Colors.gray600,
    marginBottom: Spacing.s2,
  },
  lettersContainer: {
    paddingRight: Spacing.s4,
  },
  letterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.s2,
  },
  letterButtonSelected: {
    backgroundColor: Colors.green600,
  },
  letterText: {
    fontSize: FontSizes.bodyMd,
    fontFamily: Fonts.bodyMedium,
    color: Colors.gray900,
  },
  letterTextSelected: {
    color: Colors.white,
  },
  listContent: {
    paddingBottom: Spacing.s6,
  },
  reciterCard: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusMd,
    padding: Spacing.s4,
    marginBottom: Spacing.s3,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  reciterInfo: {
    flex: 1,
  },
  reciterName: {
    fontSize: FontSizes.bodyLg,
    color: Colors.gray900,
    fontWeight: '600',
    marginBottom: Spacing.s1,
  },
  rewaya: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
    marginBottom: 2,
  },
  count: {
    fontSize: FontSizes.micro,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray400,
  },
});