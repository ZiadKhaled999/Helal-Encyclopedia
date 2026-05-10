import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, Fonts } from '../../constants/typography';

interface SectionHeaderProps {
  title: string;
  onSeeMore?: () => void;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onSeeMore,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {onSeeMore && (
        <TouchableOpacity onPress={onSeeMore} hitSlop={10}>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.s4,
    paddingVertical: Spacing.s3,
  },
  title: {
    fontSize: FontSizes.headingSm,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.gray900,
  },
  seeMore: {
    fontSize: FontSizes.bodySm,
    fontFamily: Fonts.bodyRegular,
    color: Colors.green600,
  },
});