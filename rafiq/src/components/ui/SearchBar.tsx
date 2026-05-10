import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes, Fonts } from '../../constants/typography';

interface SearchBarProps extends TextInputProps {
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  style,
  placeholder = 'Search...',
  ...rest
}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color={Colors.gray400} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray400}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray100,
    borderRadius: Spacing.radiusMd,
    paddingHorizontal: Spacing.s3,
    marginHorizontal: Spacing.s4,
    minHeight: 44,
  },
  icon: {
    marginRight: Spacing.s2,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.bodyMd,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray900,
    paddingVertical: Spacing.s2,
  },
});