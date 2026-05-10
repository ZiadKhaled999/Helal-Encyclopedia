import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

interface ScreenWrapperProps {
  children: React.ReactNode;
  headerComponent?: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  headerComponent,
  style,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.green700, Colors.green900]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {headerComponent}
      </LinearGradient>
      <View style={[styles.body, style]}>
        {children}
      </View>
    </View>
  );
};

const HEADER_HEIGHT = 120;
const OVERLAP = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: HEADER_HEIGHT,
    borderBottomLeftRadius: Spacing.radiusLg,
    borderBottomRightRadius: Spacing.radiusLg,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    marginTop: -OVERLAP,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Spacing.radiusLg,
    borderTopRightRadius: Spacing.radiusLg,
    paddingTop: Spacing.s6,
    paddingHorizontal: Spacing.s4,
  },
});