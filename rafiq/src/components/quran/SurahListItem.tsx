import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Fonts, FontSizes } from '../../constants/typography';

interface SurahListItemProps {
  number: number;
  name: string;
  englishName: string;
  verses: number;
  descent: string;
  onPress?: () => void;
}

export const SurahListItem: React.FC<SurahListItemProps> = ({
  number,
  name,
  englishName,
  verses,
  descent,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{number}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.arabicName}>{name}</Text>
        <Text style={styles.englishName}>{englishName}</Text>
        <Text style={styles.meta}>{descent} - {verses} verses</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.s3,
    paddingHorizontal: Spacing.s4,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.green100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.s3,
  },
  badgeText: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyMedium,
    color: Colors.green700,
  },
  content: {
    flex: 1,
  },
  arabicName: {
    fontSize: FontSizes.headingSm,
    fontFamily: Fonts.arabicUIMedium,
    color: Colors.textArabic,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  englishName: {
    fontSize: FontSizes.bodyMd,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
  },
  meta: {
    fontSize: FontSizes.micro,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray400,
    marginTop: 2,
  },
});