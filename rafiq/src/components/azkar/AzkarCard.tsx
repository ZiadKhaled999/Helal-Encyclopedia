import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { ArabicText } from '../shared/ArabicText';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSizes } from '../../constants/typography';
import { MaterialIcons } from '@expo/vector-icons';

export interface AzkarItem {
  id: number;
  title: string;
  adhkar: string;
  description: string;
  source: string;
  repetition: number;
}

interface AzkarCardProps {
  item: AzkarItem;
}

export const AzkarCard: React.FC<AzkarCardProps> = ({ item }) => {
  const [count, setCount] = useState(item.repetition);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (count === 0) {
      setCompleted(true);
    }
  }, [count]);

  const handlePress = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const progress = ((item.repetition - count) / item.repetition) * 100;

  return (
    <Card style={styles.card} shadow="sm" radius="lg">
      <View style={styles.content}>
        <ArabicText variant="ui" style={styles.dhikrText}>
          {item.adhkar}
        </ArabicText>

        {item.description ? (
          <ArabicText style={styles.description} numberOfLines={2}>
            {item.description}
          </ArabicText>
        ) : null}

        {item.source ? (
          <ArabicText style={styles.source} numberOfLines={1}>
            {item.source}
          </ArabicText>
        ) : null}

        <View style={styles.footer}>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.counterButton, completed && styles.completedButton]}
              onPress={handlePress}
              activeOpacity={0.7}
            >
              {completed ? (
                <MaterialIcons name="check-circle" size={24} color={Colors.white} />
              ) : (
                <ArabicText style={styles.counterText}>{count}</ArabicText>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.s4,
    marginVertical: Spacing.s2,
  },
  content: {
    padding: Spacing.s4,
  },
  dhikrText: {
    fontSize: FontSizes.bodyLg,
    color: Colors.textArabic,
    lineHeight: 28,
    marginBottom: Spacing.s2,
  },
  description: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray600,
    lineHeight: 20,
    marginBottom: Spacing.s1,
  },
  source: {
    fontSize: FontSizes.micro,
    color: Colors.gray400,
    marginBottom: Spacing.s3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s3,
  },
  counterContainer: {
    alignItems: 'center',
  },
  counterButton: {
    width: 50,
    height: 50,
    borderRadius: Spacing.radiusPill,
    backgroundColor: Colors.green600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedButton: {
    backgroundColor: Colors.green500,
  },
  counterText: {
    fontSize: FontSizes.headingSm,
    color: Colors.white,
    fontWeight: '600',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.green500,
    borderRadius: 3,
  },
});