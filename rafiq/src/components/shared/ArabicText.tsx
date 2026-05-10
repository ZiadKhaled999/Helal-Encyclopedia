import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Fonts } from '../../constants/typography';

type ArabicTextVariant = 'quran' | 'ui';

interface ArabicTextProps extends TextProps {
  variant?: ArabicTextVariant;
  children: React.ReactNode;
}

export const ArabicText: React.FC<ArabicTextProps> = ({
  variant = 'ui',
  style,
  children,
  ...rest
}) => {
  const fontFamily = variant === 'quran' ? Fonts.arabicRegular : Fonts.arabicUIRegular;

  return (
    <Text
      style={[
        styles.base,
        { fontFamily },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});