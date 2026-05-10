import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { VerseRow } from '../../src/components/quran/VerseRow';
import { AudioBar } from '../../src/components/quran/AudioBar';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes, Fonts } from '../../src/constants/typography';
import quranData from '../../src/data/quran.json';

export default function SurahReaderScreen() {
  const { surahId } = useLocalSearchParams<{ surahId: string }>();
  const router = useRouter();
  const [showTranslation, setShowTranslation] = useState(true);
  const [audioVisible, setAudioVisible] = useState(false);
  const [playingVerseId, setPlayingVerseId] = useState<number | null>(null);

  const surah = quranData.find((s) => s.Number === parseInt(surahId));

  useEffect(() => {
    if (!surah) {
      router.replace('/(tabs)/quran');
    }
  }, [surah, router]);

  if (!surah) {
    return null;
  }

  const verses = surah.Array_Verses?.[0] || [];

  const headerComponent = (
    <View style={styles.surahHeader}>
      <View style={styles.headerTop}>
        <Link href="/(tabs)/quran" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.surahInfo}>
          <Text style={styles.surahName}>{surah.Name}</Text>
          <Text style={styles.surahEnglishName}>{surah.English_Name}</Text>
        </View>
      </View>
      <Text style={styles.surahMeta}>
        {surah.Descent} • {surah.Number_Verses} verses
      </Text>
    </View>
  );

  const renderVerse = ({ item }: { item: typeof verses[0] }) => (
    <VerseRow
      verse={item}
      showTranslation={showTranslation}
      onToggleTranslation={() => setShowTranslation(!showTranslation)}
      onPlay={() => setPlayingVerseId(item.id)}
      isPlaying={playingVerseId === item.id}
    />
  );

  return (
    <View style={styles.container}>
      <ScreenWrapper headerComponent={headerComponent}>
        <FlashList
          data={verses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVerse}
          contentContainerStyle={styles.verseList}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={150}
        />
      </ScreenWrapper>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`/quran/tafsir/${surahId}`)}
        >
          <Text style={styles.actionText}>Tafsir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => setAudioVisible(true)}>
          <Text style={styles.actionText}>Listen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Bookmark</Text>
        </TouchableOpacity>
      </View>

      <AudioBar
        visible={audioVisible}
        surahName={surah.Name}
        surahEnglishName={surah.English_Name}
        audioUri={`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranacademy/1/${surahId}.mp3`}
        onClose={() => setAudioVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  surahHeader: {
    paddingHorizontal: Spacing.s4,
    paddingBottom: Spacing.s3,
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: Spacing.s2,
  },
  backText: {
    fontSize: 20,
    color: Colors.white,
  },
  surahInfo: {
    flex: 1,
    alignItems: 'center',
  },
  surahName: {
    fontSize: FontSizes.headingMd,
    fontFamily: Fonts.arabicUIMedium,
    color: Colors.white,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  surahEnglishName: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray100,
  },
  surahMeta: {
    fontSize: FontSizes.micro,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray200,
    marginTop: 4,
  },
  verseList: {
    paddingBottom: 80,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingVertical: Spacing.s2,
    paddingHorizontal: Spacing.s4,
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.s2,
  },
  actionText: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyMedium,
    color: Colors.green600,
  },
});