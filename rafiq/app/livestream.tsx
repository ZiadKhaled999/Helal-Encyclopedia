import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { FontSizes } from '../../src/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const streams = [
  {
    id: 'mecca',
    title: 'الكعبة المشرفة',
    url: 'https://www.youtube.com/watch?v=0uZJ8jT5hGE',
  },
  {
    id: 'medina',
    title: 'المسجد النبوي',
    url: 'https://www.youtube.com/watch?v=9WiP0yY2Z7I',
  },
];

export default function LivestreamScreen() {
  const openStream = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScreenWrapper headerComponent={<BackHeader title="بث مباشر" />}>
      <View style={styles.container}>
        <ArabicText style={styles.headerText}>
          مشاهدة بث المساجد الحرمين
        </ArabicText>
        
        {streams.map((stream) => (
          <Card key={stream.id} style={styles.streamCard} shadow="md" radius="lg">
            <View style={styles.cardContent}>
              <MaterialIcons name="live-tv" size={40} color={Colors.green600} />
              <View style={styles.textContainer}>
                <ArabicText style={styles.streamTitle}>{stream.title}</ArabicText>
                <ArabicText style={styles.streamSubtitle}>بث مباشر 24 ساعة</ArabicText>
              </View>
              <MaterialIcons 
                name="open-in-browser" 
                size={24} 
                color={Colors.green600} 
              />
            </View>
          </Card>
        ))}

        <ArabicText style={styles.noteText}>
          سيتم فتح البث في المتصفح الخارجي
        </ArabicText>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.s4,
    gap: Spacing.s4,
  },
  headerText: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray600,
    textAlign: 'center',
    marginBottom: Spacing.s4,
    marginTop: Spacing.s4,
  },
  streamCard: {
    padding: Spacing.s5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s3,
  },
  textContainer: {
    flex: 1,
  },
  streamTitle: {
    fontSize: FontSizes.bodyLg,
    color: Colors.gray900,
    fontWeight: '500',
  },
  streamSubtitle: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray600,
    marginTop: Spacing.s1,
  },
  noteText: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray500,
    textAlign: 'center',
    marginTop: Spacing.s4,
  },
});