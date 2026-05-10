import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { SearchBar } from '../../src/components/ui/SearchBar';
import { SurahListItem } from '../../src/components/quran/SurahListItem';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes, Fonts } from '../../src/constants/typography';
import quranData from '../../src/data/quran.json';

export default function QuranScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = useMemo(() => {
    if (!searchQuery) return quranData;
    const query = searchQuery.toLowerCase();
    return quranData.filter(
      (s) =>
        s.Name.includes(query) ||
        s.English_Name.toLowerCase().includes(query) ||
        s.Name_Translation.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const renderItem = ({ item }: { item: typeof quranData[0] }) => (
    <Link href={`/quran/${item.Number}`} asChild>
      <SurahListItem
        number={item.Number}
        name={item.Name}
        englishName={item.English_Name}
        verses={item.Number_Verses}
        descent={item.Descent}
      />
    </Link>
  );

  const headerComponent = (
    <View style={styles.headerContent}>
      <Text style={styles.title}>القرآن الكريم</Text>
      <Text style={styles.subtitle}>114 سورة</Text>
    </View>
  );

  return (
    <ScreenWrapper headerComponent={headerComponent}>
      <SearchBar
        placeholder="البحث في السور"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />
      <FlashList
        data={filteredSurahs}
        keyExtractor={(item) => item.Number.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={80}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    paddingHorizontal: Spacing.s6,
    paddingTop: Spacing.s4,
    paddingBottom: Spacing.s2,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.headingLg,
    fontFamily: Fonts.arabicUIMedium,
    color: Colors.white,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  subtitle: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray100,
    marginTop: 4,
  },
  searchBar: {
    marginHorizontal: 0,
    marginTop: Spacing.s2,
  },
  list: {
    paddingBottom: Spacing.s4,
  },
});