import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';

const sections = [
  { id: 'life', title: 'حياة النبي', href: '/prophet/life', description: '39 فصل' },
  { id: 'who', title: 'من هو محمد رسول الله', href: '/prophet/who', description: '42 فصل' },
  { id: 'character', title: 'خلق النبي', href: '/prophet/character', description: '20 فصل' },
  { id: 'invasions', title: 'غزوات النبي', href: '/prophet/invasions', description: '8 معارك' },
  { id: 'wives', title: 'زوجات النبي', href: '/prophet/wives', description: '11 زوجة' },
];

export default function ProphetIndexScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ArabicText variant="ui" style={styles.header}>
          سيرة النبي محمد صلى الله عليه وسلم
        </ArabicText>
        <View style={styles.grid}>
          {sections.map((section) => (
            <Link key={section.id} href={section.href as any} asChild>
              <TouchableOpacity style={styles.card}>
                <ArabicText variant="ui" style={styles.cardTitle}>
                  {section.title}
                </ArabicText>
                <ArabicText variant="ui" style={styles.cardDescription}>
                  {section.description}
                </ArabicText>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.s4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.green800,
    marginBottom: Spacing.s6,
    textAlign: 'center',
  },
  grid: {
    gap: Spacing.s4,
  },
  card: {
    backgroundColor: Colors.green100,
    borderRadius: Spacing.radiusMd,
    padding: Spacing.s5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.green800,
    marginBottom: Spacing.s2,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.gray600,
  },
});