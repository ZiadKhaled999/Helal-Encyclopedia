import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { usePrayerTimes, getNextPrayer } from '../../src/hooks/usePrayerTimes';
import { useLocation } from '../../src/hooks/useLocation';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';

const prayerNames = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

export default function PrayerScreen() {
  const { location, loading: locationLoading } = useLocation();
  const { data, isLoading, error } = usePrayerTimes();

  const nextPrayer = data ? getNextPrayer(data.timings) : null;
  const currentPrayer = nextPrayer?.name;

  const formatTime = (time: string) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const h = parseInt(hour, 10);
    const period = h >= 12 ? 'م' : 'ص';
    const hour12 = h % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  if (locationLoading || isLoading) {
    return (
      <ScreenWrapper headerComponent={<BackHeader title="أوقات الصلاة" />}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.green600} />
        </View>
      </ScreenWrapper>
    );
  }

  if (error || !data) {
    return (
      <ScreenWrapper headerComponent={<BackHeader title="أوقات الصلاة" />}>
        <View style={styles.center}>
          <Text>حدث خطأ في تحميل أوقات الصلاة</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper headerComponent={<BackHeader title="أوقات الصلاة" />}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <ArabicText style={styles.locationText}>
            {location?.city || 'الموقع غير محدد'}
          </ArabicText>
          <ArabicText style={styles.hijriText}>
            {data.hijri.day} {data.hijri.month.ar} {data.hijri.year}
          </ArabicText>
        </View>

        {nextPrayer && (
          <Card style={styles.nextPrayerCard} shadow="md" radius="lg">
            <View style={styles.nextPrayerContent}>
              <ArabicText style={styles.nextPrayerLabel}>الصلاة التالية</ArabicText>
              <View style={styles.nextPrayerRow}>
                <View style={styles.nextPrayerInfo}>
                  <ArabicText style={styles.nextPrayerName}>
                    {prayerNames[nextPrayer.name as keyof typeof prayerNames]}
                  </ArabicText>
                  <ArabicText style={styles.nextPrayerTime}>
                    {formatTime(nextPrayer.time)}
                  </ArabicText>
                </View>
                <View style={styles.countdownBadge}>
                  <MaterialIcons name="timer" size={20} color={Colors.white} />
                  <ArabicText style={styles.countdownText}>{nextPrayer.countdown}</ArabicText>
                </View>
              </View>
            </View>
          </Card>
        )}

        <View style={styles.prayerList}>
          {Object.entries(data.timings).map(([key, time]) => {
            if (key === 'Imsak' || key === 'Midnight') return null;
            const isCurrent = key === currentPrayer;
            return (
              <Card
                key={key}
                style={isCurrent ? styles.prayerItemCurrent : styles.prayerItem}
                shadow="sm"
              >
                <View style={styles.prayerRow}>
                  <ArabicText style={isCurrent ? styles.prayerNameCurrent : styles.prayerName}>
                    {prayerNames[key as keyof typeof prayerNames] || key}
                  </ArabicText>
                  <ArabicText style={isCurrent ? styles.prayerTimeCurrent : styles.prayerTime}>
                    {formatTime(time)}
                  </ArabicText>
                </View>
              </Card>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.s4,
    paddingHorizontal: Spacing.s2,
  },
  locationText: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
    fontWeight: '500',
  },
  hijriText: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray600,
  },
  nextPrayerCard: {
    padding: Spacing.s5,
    backgroundColor: Colors.green700,
    marginBottom: Spacing.s5,
  },
  nextPrayerContent: {
    alignItems: 'center',
  },
  nextPrayerLabel: {
    color: Colors.white,
    fontSize: FontSizes.bodyMd,
    marginBottom: Spacing.s3,
  },
  nextPrayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s4,
  },
  nextPrayerInfo: {
    alignItems: 'flex-end',
  },
  nextPrayerName: {
    color: Colors.white,
    fontSize: FontSizes.headingMd,
    fontWeight: '600',
  },
  nextPrayerTime: {
    color: Colors.green100,
    fontSize: FontSizes.headingSm,
  },
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green600,
    paddingHorizontal: Spacing.s3,
    paddingVertical: Spacing.s2,
    borderRadius: Spacing.radiusPill,
    gap: Spacing.s1,
  },
  countdownText: {
    color: Colors.white,
    fontSize: FontSizes.bodyMd,
    fontWeight: '500',
  },
  prayerList: {
    gap: Spacing.s2,
  },
  prayerItem: {
    padding: Spacing.s4,
  },
  prayerItemCurrent: {
    padding: Spacing.s4,
    backgroundColor: Colors.green100,
    borderColor: Colors.green600,
    borderWidth: 1,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prayerName: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
  },
  prayerNameCurrent: {
    fontSize: FontSizes.bodyMd,
    color: Colors.green700,
    fontWeight: '600',
  },
  prayerTime: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray600,
  },
  prayerTimeCurrent: {
    fontSize: FontSizes.bodyMd,
    color: Colors.green700,
    fontWeight: '600',
  },
});