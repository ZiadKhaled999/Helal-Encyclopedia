import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { useAudio } from '../../src/hooks/useAudio';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';

const ruqyahTracks = [
  { id: 'ruqyah-1', title: 'الرقية الشرعية - المشهد 1', duration: '2:30', uri: require('../../assets/audio/ruqyah/track1.mp3') },
  { id: 'ruqyah-2', title: 'الرقية الشرعية - المشهد 2', duration: '2:30', uri: require('../../assets/audio/ruqyah/track2.mp3') },
  { id: 'ruqyah-3', title: 'الرقية الشرعية - المشهد 3', duration: '2:30', uri: require('../../assets/audio/ruqyah/track3.mp3') },
  { id: 'ruqyah-4', title: 'الرقية الشرعية - المشهد 4', duration: '2:30', uri: require('../../assets/audio/ruqyah/track4.mp3') },
  { id: 'ruqyah-5', title: 'الرقية الشرعية - المشهد 5', duration: '2:30', uri: require('../../assets/audio/ruqyah/track5.mp3') },
  { id: 'ruqyah-6', title: 'الرقية الشرعية - المشهد 6', duration: '2:30', uri: require('../../assets/audio/ruqyah/track6.mp3') },
  { id: 'ruqyah-7', title: 'الرقية الشرعية - المشهد 7', duration: '2:30', uri: require('../../assets/audio/ruqyah/track7.mp3') },
  { id: 'ruqyah-8', title: 'الرقية الشرعية - المشهد 8', duration: '2:30', uri: require('../../assets/audio/ruqyah/track8.mp3') },
  { id: 'ruqyah-9', title: 'الرقية الشرعية - المشهد 9', duration: '2:30', uri: require('../../assets/audio/ruqyah/track9.mp3') },
  { id: 'ruqyah-10', title: 'الرقية الشرعية - المشهد 10', duration: '2:30', uri: require('../../assets/audio/ruqyah/track10.mp3') },
  { id: 'ruqyah-11', title: 'الرقية الشرعية - المشهد 11', duration: '2:30', uri: require('../../assets/audio/ruqyah/track11.mp3') },
  { id: 'ruqyah-12', title: 'الرقية الشرعية - المشهد 12', duration: '2:30', uri: require('../../assets/audio/ruqyah/track12.mp3') },
  { id: 'ruqyah-13', title: 'الرقية الشرعية - المشهد 13', duration: '2:30', uri: require('../../assets/audio/ruqyah/track13.mp3') },
  { id: 'ruqyah-14', title: 'الرقية الشرعية - المشهد 14', duration: '2:30', uri: require('../../assets/audio/ruqyah/track14.mp3') },
  { id: 'ruqyah-15', title: 'الرقية الشرعية - المشهد 15', duration: '2:30', uri: require('../../assets/audio/ruqyah/track15.mp3') },
  { id: 'ruqyah-16', title: 'الرقية الشرعية - المشهد 16', duration: '2:30', uri: require('../../assets/audio/ruqyah/track16.mp3') },
  { id: 'ruqyah-17', title: 'الرقية الشرعية - المشهد 17', duration: '2:30', uri: require('../../assets/audio/ruqyah/track17.mp3') },
  { id: 'ruqyah-18', title: 'الرقية الشرعية - المشهد 18', duration: '2:30', uri: require('../../assets/audio/ruqyah/track18.mp3') },
];

export default function RuqyahScreen() {
  const { isPlaying, position, duration, play, pause, load, formatTime } = useAudio();
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const handlePlay = async (track: typeof ruqyahTracks[0]) => {
    if (currentTrack !== track.id) {
      await load(track.uri);
      setCurrentTrack(track.id);
    }
    await play();
  };

  const handlePause = async () => {
    await pause();
  };

  const renderTrack = ({ item }: { item: typeof ruqyahTracks[0] }) => {
    const isCurrent = currentTrack === item.id;
    const playing = isCurrent && isPlaying;

    return (
      <Card style={styles.trackCard} shadow="sm">
        <View style={styles.trackContent}>
          <View style={styles.trackInfo}>
            <ArabicText style={styles.trackTitle}>{item.title}</ArabicText>
            <ArabicText style={styles.trackDuration}>{item.duration}</ArabicText>
          </View>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => (playing ? handlePause() : handlePlay(item))}
          >
            <MaterialIcons
              name={playing ? 'pause' : 'play-arrow'}
              size={24}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <ScreenWrapper headerComponent={<BackHeader title="الرقية الشرعية" />}>
      <View style={styles.container}>
        <ArabicText style={styles.headerText}>
          استمع إلى التسجيلات الصوتية للرقية الشرعية
        </ArabicText>

        <FlatList
          data={ruqyahTracks}
          renderItem={renderTrack}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.s2 }} />}
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
  headerText: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray600,
    textAlign: 'center',
    marginBottom: Spacing.s4,
  },
  list: {
    paddingBottom: Spacing.s4,
  },
  trackCard: {
    padding: Spacing.s4,
  },
  trackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
  },
  trackDuration: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray400,
    marginTop: Spacing.s1,
  },
  playButton: {
    backgroundColor: Colors.green600,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});