import React from 'react';
import { StyleSheet, TouchableOpacity, View, Switch } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../src/components/shared/ScreenWrapper';
import { BackHeader } from '../../src/components/shared/BackHeader';
import { ArabicText } from '../../src/components/shared/ArabicText';
import { Card } from '../../src/components/ui/Card';
import { SectionHeader } from '../../src/components/ui/SectionHeader';
import { Spacing } from '../../src/constants/spacing';
import { Colors } from '../../src/constants/colors';
import { FontSizes } from '../../src/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettingsStore } from '../../src/store/settingsStore';

export interface Category {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
}

export const CATEGORIES: Category[] = [
  { id: 'quran', label: 'القرآن الكريم', icon: 'menu-book', route: '/(tabs)/quran' },
  { id: 'azkar', label: 'الأذكار', icon: 'auto-stories', route: '/(tabs)/azkar' },
  { id: 'duas', label: 'الدعاة', icon: 'forum', route: '/(tabs)/duas' },
  { id: 'qibla', label: 'القبلة', icon: 'explore', route: '/(tabs)/qibla' },
  { id: 'prayer', label: 'أوقات الصلاة', icon: 'access-time', route: '/(tabs)/prayer' },
  { id: 'ruqyah', label: 'الرقية الشرعية', icon: 'healing', route: '/(tabs)/ruqyah' },
  { id: 'tasbih', label: 'التسبيح', icon: 'casino', route: '/(tabs)/tasbih' },
  { id: 'calendar', label: 'التقويم الهجري', icon: 'calendar-today', route: '/(tabs)/calendar' },
  { id: 'more', label: 'المزيد', icon: 'more-horiz', route: '/(tabs)/more' },
  { id: 'settings', label: 'الإعدادات', icon: 'settings', route: '/(tabs)/settings' },
];

interface SettingsItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, onPress, rightElement }) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress} disabled={!onPress}>
    <View style={styles.settingsItemLeft}>
      <MaterialIcons name={icon} size={24} color={Colors.green600} />
      <ArabicText style={styles.settingsItemLabel}>{label}</ArabicText>
    </View>
    {rightElement || <MaterialIcons name="chevron-right" size={24} color={Colors.gray400} />}
  </TouchableOpacity>
);

export default function MoreScreen() {
  const { language, notificationsEnabled, toggleNotifications, setTheme } = useSettingsStore();

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  const handleAboutPress = () => {
    router.push('/about' as any);
  };

  const handlePrivacyPress = () => {
    router.push('/privacy' as any);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleCategoryPress(item.route)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={item.icon} size={28} color={Colors.green600} />
      </View>
      <ArabicText style={styles.label}>{item.label}</ArabicText>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper headerComponent={<BackHeader title="المزيد" onBack={() => router.back()} />}>
      <FlashList
        data={[{ key: 'categories' }, { key: 'settings' }]}
        renderItem={({ item }) => {
          if (item.key === 'categories') {
            return (
              <>
                <ArabicText style={styles.sectionHeader}>الفئات</ArabicText>
                <FlashList
                  data={CATEGORIES}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  contentContainerStyle={styles.list}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </>
            );
          }
          return (
            <>
              <SectionHeader title="الإعدادات" style={styles.sectionHeader} />
              <Card style={styles.settingsCard}>
                <SettingsItem
                  icon="language"
                  label="اللغة"
                  rightElement={
                    <View style={styles.languageToggle}>
                      <ArabicText style={[styles.languageText, language === 'ar' && styles.languageTextActive]}>
                        AR
                      </ArabicText>
                      <Switch
                        value={language === 'en'}
                        onValueChange={(val) => setTheme(val ? 'en' : 'ar')}
                        trackColor={{ false: Colors.gray200, true: Colors.green600 }}
                      />
                      <ArabicText style={[styles.languageText, language === 'en' && styles.languageTextActive]}>
                        EN
                      </ArabicText>
                    </View>
                  }
                />
                <SettingsItem
                  icon="notifications"
                  label="إشعارات الأذكار"
                  rightElement={
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={toggleNotifications}
                      trackColor={{ false: Colors.gray200, true: Colors.green600 }}
                    />
                  }
                />
                <SettingsItem
                  icon="info"
                  label="عن التطبيق"
                  onPress={handleAboutPress}
                />
                <SettingsItem
                  icon="privacy-tip"
                  label="سياسة الخصوصية"
                  onPress={handlePrivacyPress}
                />
              </Card>
            </>
          );
        }}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.s4,
    paddingBottom: Spacing.s6,
  },
  sectionHeader: {
    fontSize: FontSizes.headingSm,
    color: Colors.gray900,
    marginHorizontal: Spacing.s4,
    marginTop: Spacing.s4,
    marginBottom: Spacing.s3,
  },
  list: {
    paddingHorizontal: Spacing.s2,
  },
  item: {
    flex: 1,
    margin: Spacing.s2,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusMd,
    padding: Spacing.s4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: Spacing.radiusMd,
    backgroundColor: Colors.green100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.s2,
  },
  label: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
    textAlign: 'center',
  },
  settingsCard: {
    marginHorizontal: 0,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.s3,
    paddingHorizontal: Spacing.s2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s3,
  },
  settingsItemLabel: {
    fontSize: FontSizes.bodyMd,
    color: Colors.gray900,
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s1,
  },
  languageText: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray600,
  },
  languageTextActive: {
    color: Colors.green600,
    fontWeight: '600',
  },
});