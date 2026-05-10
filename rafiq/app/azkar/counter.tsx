import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Vibration } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);

  const handleTap = () => {
    if (count < target) {
      setCount(count + 1);
      Vibration.vibrate(50);
    }
  };

  const handleReset = () => {
    setCount(0);
    Vibration.vibrate(100);
  };

  const setPreset = (value: number) => {
    setTarget(value);
    setCount(0);
  };

  const progress = (count / target) * 100;

  return (
    <ScreenWrapper headerComponent={<BackHeader title="التسبيح الرقمي" />}>
      <View style={styles.container}>
        <Card style={styles.counterCard} shadow="md" radius="xl">
          <View style={styles.counterDisplay}>
            <ArabicText style={styles.countText}>{count}</ArabicText>
            <ArabicText style={styles.targetText}>/ {target}</ArabicText>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </Card>

        <TouchableOpacity
          style={styles.tapButton}
          onPress={handleTap}
          activeOpacity={0.8}
        >
          <ArabicText style={styles.tapButtonText}>اضغط للتسبيح</ArabicText>
          <MaterialIcons name="touch-app" size={24} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.presetsContainer}>
          <ArabicText style={styles.presetsTitle}>الأعداد المحددة</ArabicText>
          <View style={styles.presetsRow}>
            {[33, 99, 100].map((preset) => (
              <TouchableOpacity
                key={preset}
                style={[styles.presetButton, target === preset && styles.activePreset]}
                onPress={() => setPreset(preset)}
              >
                <ArabicText style={[styles.presetText, target === preset && styles.activePresetText]}>
                  {preset}
                </ArabicText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <MaterialIcons name="refresh" size={20} color={Colors.gray600} />
          <ArabicText style={styles.resetText}>إعادة التثبيت</ArabicText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
  },
  counterCard: {
    padding: Spacing.s6,
    alignItems: 'center',
    marginBottom: Spacing.s6,
  },
  counterDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.s4,
  },
  countText: {
    fontSize: 72,
    fontWeight: '700',
    color: Colors.green700,
    fontFamily: 'NotoNaskhArabic-Bold',
  },
  targetText: {
    fontSize: FontSizes.headingLg,
    color: Colors.gray400,
    marginLeft: Spacing.s2,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.green500,
    borderRadius: 4,
  },
  tapButton: {
    backgroundColor: Colors.green600,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.s4,
    borderRadius: Spacing.radiusLg,
    gap: Spacing.s2,
    marginBottom: Spacing.s6,
  },
  tapButtonText: {
    fontSize: FontSizes.headingMd,
    color: Colors.white,
    fontWeight: '600',
  },
  presetsContainer: {
    marginBottom: Spacing.s4,
  },
  presetsTitle: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
    marginBottom: Spacing.s2,
    textAlign: 'center',
  },
  presetsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.s3,
  },
  presetButton: {
    flex: 1,
    paddingVertical: Spacing.s3,
    backgroundColor: Colors.gray100,
    borderRadius: Spacing.radiusMd,
    alignItems: 'center',
  },
  activePreset: {
    backgroundColor: Colors.green600,
  },
  presetText: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
  },
  activePresetText: {
    color: Colors.white,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s2,
    paddingVertical: Spacing.s3,
  },
  resetText: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray600,
  },
});