import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Shadows } from '../../constants/shadows';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: 'sm' | 'md' | 'none';
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'pill';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  shadow = 'none',
  radius = 'md',
}) => {
  return (
    <View
      style={[
        styles.base,
        shadow === 'sm' && Shadows.sm,
        shadow === 'md' && Shadows.md,
        styles[radius],
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.white,
  },
  sm: {
    borderRadius: Spacing.radiusSm,
  },
  md: {
    borderRadius: Spacing.radiusMd,
  },
  lg: {
    borderRadius: Spacing.radiusLg,
  },
  xl: {
    borderRadius: Spacing.radiusXl,
  },
  pill: {
    borderRadius: Spacing.radiusPill,
  },
});