import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ArabicText } from '../shared/ArabicText';
import { Spacing } from '../../constants/spacing';
import { Colors } from '../../constants/colors';
import { FontSizes, Fonts } from '../../constants/typography';

interface PrayerTime {
  name: string;
  time: string;
}

const PRAYER_TIMES: PrayerTime[] = [
  { name: 'الفجر', time: '04:30' },
  { name: 'الشروق', time: '06:00' },
  { name: 'الظهر', time: '12:15' },
  { name: 'العصر', time: '15:30' },
  { name: 'المغرب', time: '18:45' },
  { name: 'العشاء', time: '19:30' },
];

export const PrayerHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ArabicText style={styles.greeting}>صباح الخير</ArabicText>
      <View style={styles.prayerTimesContainer}>
        {PRAYER_TIMES.map((prayer) => (
          <View key={prayer.name} style={styles.prayerTimeItem}>
            <ArabicText style={styles.prayerName}>{prayer.name}</ArabicText>
            <ArabicText style={styles.prayerTime}>{prayer.time}</ArabicText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.s4,
    paddingTop: Spacing.s6,
  },
  greeting: {
    fontSize: FontSizes.headingMd,
    fontFamily: Fonts.arabicUIMedium,
    color: Colors.white,
    marginBottom: Spacing.s4,
  },
  prayerTimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.s2,
  },
  prayerTimeItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: Spacing.radiusSm,
    paddingVertical: Spacing.s2,
    paddingHorizontal: Spacing.s3,
    minWidth: 70,
  },
  prayerName: {
    fontSize: FontSizes.bodySm,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 2,
  },
  prayerTime: {
    fontSize: FontSizes.bodyMd,
    fontFamily: Fonts.arabicUIMedium,
    color: Colors.white,
  },
});