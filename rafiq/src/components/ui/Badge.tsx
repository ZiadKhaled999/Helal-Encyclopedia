import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, Fonts } from '../../constants/typography';

type BadgeVariant = 'count' | 'tag';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'count',
  style,
  textStyle,
}) => {
  const isCount = variant === 'count';

  return (
    <View style={[styles.base, isCount ? styles.count : styles.tag, style]}>
      <Text style={[styles.text, isCount ? styles.countText : styles.tagText, textStyle]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    minWidth: 20,
    height: 20,
    borderRadius: Spacing.radiusPill,
    backgroundColor: Colors.green600,
    paddingHorizontal: 6,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.s2,
    borderRadius: Spacing.radiusSm,
    backgroundColor: Colors.gray100,
  },
  text: {
    fontSize: FontSizes.micro,
    fontFamily: Fonts.bodyMedium,
  },
  countText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  tagText: {
    color: Colors.gray600,
  },
});