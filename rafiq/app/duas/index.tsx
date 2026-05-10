import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const duaCategories = [
  {
    id: 'ruqyah',
    title: 'الرقية الشرعية',
    subtitle: '18 تسجيل صوتي',
    icon: 'healing',
  },
  {
    id: 'knowledge',
    title: 'دعاء للعلم',
    subtitle: 'طلب العلم والفهم',
    icon: 'school',
  },
  {
    id: 'deceased',
    title: 'دعاء للمتوفي',
    subtitle: 'الدعاء للروح البريئة',
    icon: 'account-heart',
  },
  {
    id: 'istikhara',
    title: ' دعاء الاستخارة',
    subtitle: 'طلب الحلال والرضا',
    icon: 'hands-pray',
  },
];

export default function DuasScreen() {
  return (
    <ScreenWrapper headerComponent={<BackHeader title="الأدعية" />}>
      <View style={styles.container}>
        {duaCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => router.push(`/duas/${category.id}`)}
          >
            <Card style={styles.categoryCard} shadow="sm">
              <View style={styles.cardContent}>
                <MaterialIcons
                  name={category.icon as any}
                  size={32}
                  color={Colors.green600}
                />
                <View style={styles.textContainer}>
                  <ArabicText style={styles.title}>{category.title}</ArabicText>
                  <ArabicText style={styles.subtitle}>{category.subtitle}</ArabicText>
                </View>
                <MaterialIcons name="chevron-left" size={24} color={Colors.gray400} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
    gap: Spacing.s3,
  },
  categoryCard: {
    padding: Spacing.s4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s3,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSizes.bodyLg,
    color: Colors.gray900,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray600,
    marginTop: Spacing.s1,
  },
});