import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { ArabicText } from './ArabicText';

interface BackHeaderProps {
  title?: string;
  onBack?: () => void;
  style?: ViewStyle;
}

export const BackHeader: React.FC<BackHeaderProps> = ({
  title,
  onBack,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.white} />
      </TouchableOpacity>
      {title && (
        <ArabicText variant="ui" style={styles.title}>
          {title}
        </ArabicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.s4,
    paddingTop: Spacing.s4,
    height: 56,
  },
  backButton: {
    padding: Spacing.s2,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 40,
  },
});