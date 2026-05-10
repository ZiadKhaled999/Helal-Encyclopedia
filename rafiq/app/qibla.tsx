import React, { useEffect } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { useQibla } from '../../src/hooks/useQibla';
import { useLocation } from '../../src/hooks/useLocation';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';

export default function QiblaScreen() {
  const { location, loading: locationLoading } = useLocation();
  const { heading, qiblaDirection, isActive, start, stop } = useQibla();

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const rotation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: heading - qiblaDirection,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [heading, qiblaDirection]);

  const compassRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const qiblaAngle = qiblaDirection - heading;
  const isAligned = Math.abs(qiblaAngle) < 5 || Math.abs(qiblaAngle - 360) < 5;

  return (
    <ScreenWrapper headerComponent={<BackHeader title="القبلة" />}>
      <View style={styles.container}>
        <View style={styles.compassContainer}>
          <Animated.View
            style={[
              styles.compass,
              { transform: [{ rotate: compassRotation }] },
            ]}
          >
            <View style={styles.compassInner}>
              <View style={styles.northIndicator} />
              <MaterialIcons
                name="explore"
                size={80}
                color={Colors.green600}
                style={styles.qiblaIcon}
              />
            </View>
          </Animated.View>
          <View style={styles.centerDot} />
        </View>

        <Card style={styles.infoCard} shadow="sm">
          <ArabicText style={styles.directionText}>
            اتجاه القبلة: {Math.round(qiblaDirection)}°
          </ArabicText>
          <ArabicText style={styles.headingText}>
            الاتجاه الحالي: {heading}°
          </ArabicText>
        </Card>

        {isAligned && (
          <Card style={styles.alignedCard} shadow="sm">
            <ArabicText style={styles.alignedText}>
              تم توجيهك نحو القبلة
            </ArabicText>
          </Card>
        )}

        <ArabicText style={styles.footerText}>
          {location
            ? `الموقع: ${location.city || 'غير محدد'}`
            : 'جاري تحديد الموقع...'}
        </ArabicText>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
    alignItems: 'center',
  },
  compassContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.s6,
  },
  compass: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: Colors.green600,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green050,
  },
  compassInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: Colors.green400,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  northIndicator: {
    position: 'absolute',
    top: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.green700,
  },
  qiblaIcon: {
    transform: [{ rotate: '180deg' }],
  },
  centerDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.green700,
  },
  infoCard: {
    padding: Spacing.s4,
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.s4,
  },
  directionText: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
    marginBottom: Spacing.s1,
  },
  headingText: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray600,
  },
  alignedCard: {
    padding: Spacing.s4,
    width: '100%',
    backgroundColor: Colors.green100,
    borderColor: Colors.green600,
    borderWidth: 1,
    marginBottom: Spacing.s4,
    alignItems: 'center',
  },
  alignedText: {
    fontSize: FontSizes.bodyMd,
    color: Colors.green700,
    fontWeight: '600',
  },
  footerText: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray600,
  },
});