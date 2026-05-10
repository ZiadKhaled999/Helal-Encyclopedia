import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontSizes, Fonts } from '../constants/typography';
import { Button } from '../components/ui/Button';
import { useOnboardingStore } from '../store/onboardingStore';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
  gradientColors: [string, string];
}

const SLIDES: Slide[] = [
  {
    id: '1',
    icon: 'menu-book',
    title: 'القرآن الكريم',
    description: 'اقرأ واستمع إلى القرآن الكريم بخط واضح مع تفسير المعاني والآيات',
    gradientColors: [Colors.green600, Colors.green800],
  },
  {
    id: '2',
    icon: 'auto-stories',
    title: 'الأذكار والدعاء',
    description: 'تنبيهات للأذكار الموقعة والوقت، مع مجموعة شاملة من الأدعية',
    gradientColors: [Colors.green500, Colors.green700],
  },
  {
    id: '3',
    icon: 'explore',
    title: 'القبلة والصلاة',
    description: 'اتجاه القبلة بدقة عالية وأوقات الصلاة حسب موقعك',
    gradientColors: [Colors.green700, Colors.green900],
  },
  {
    id: '4',
    title: 'التسبيح الرقمي',
    icon: 'casino',
    description: 'عدد التسابيح والذكر باللمسة الواحدة مع اختيار العدد المناسب',
    gradientColors: [Colors.green400, Colors.green600],
  },
  {
    id: '5',
    icon: 'star',
    title: 'ابدأ رحلتك',
    description: 'اكتشف جميع الميزات والبدء في رحلتك الروحية اليوم',
    gradientColors: [Colors.green800, Colors.green600],
  },
];

export const OnboardingScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const progressAnims = useRef(SLIDES.map(() => new Animated.Value(0))).current;
  const { markOnboardingComplete } = useOnboardingStore();

  useEffect(() => {
    animateSlide();
  }, [currentIndex]);

  useEffect(() => {
    progressAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index <= currentIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);

  const animateSlide = () => {
    scaleAnim.setValue(0);
    fadeAnim.setValue(0);
    slideAnim.setValue(30);

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  const handleComplete = () => {
    markOnboardingComplete();
    router.replace('/(tabs)');
  };

  const renderSlide = ({ item }: { item: Slide }) => {
    const scale = scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    return (
      <View style={styles.slide}>
        <LinearGradient
          colors={item.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale }],
                opacity: fadeAnim,
              },
            ]}
          >
            <MaterialIcons name={item.icon} size={80} color={Colors.white} />
          </Animated.View>
        </LinearGradient>

        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      </View>
    );
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        {SLIDES.map((_, index) => {
          const widthAnim = progressAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [40, 40],
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index === currentIndex ? Colors.green600 : Colors.gray200,
                  width: index === currentIndex ? 40 : 12,
                  transform: [
                    {
                      scale: progressAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: index === currentIndex ? [1.2, 1] : [1, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      {renderProgressBar()}

      <View style={styles.footer}>
        {currentIndex > 0 && (
          <TouchableOpacity onPress={handlePrev} style={styles.navButton}>
            <MaterialIcons name="chevron-right" size={24} color={Colors.gray600} />
          </TouchableOpacity>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={currentIndex === SLIDES.length - 1 ? 'ابدأ الآن' : 'التالي'}
            onPress={handleNext}
            variant="primary"
            style={styles.nextButton}
          />
          {currentIndex < SLIDES.length - 1 && (
            <TouchableOpacity onPress={handleComplete} style={styles.skipButton}>
              <Text style={styles.skipText}>تخطي</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  slide: {
    width,
    flex: 1,
  },
  gradientBackground: {
    height: width * 0.6,
    borderBottomLeftRadius: Spacing.radiusXl,
    borderBottomRightRadius: Spacing.radiusXl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.s6,
    paddingVertical: Spacing.s8,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.displayMd,
    fontFamily: Fonts.displayBold,
    color: Colors.gray900,
    marginBottom: Spacing.s4,
    textAlign: 'center',
  },
  description: {
    fontSize: FontSizes.bodyLg,
    fontFamily: Fonts.bodyRegular,
    color: Colors.gray600,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '80%',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.s2,
    marginBottom: Spacing.s6,
  },
  progressDot: {
    height: 12,
    borderRadius: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.s4,
    paddingVertical: Spacing.s4,
  },
  navButton: {
    padding: Spacing.s2,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  nextButton: {
    minWidth: 140,
  },
  skipButton: {
    marginTop: Spacing.s2,
  },
  skipText: {
    fontSize: FontSizes.bodySm,
    color: Colors.gray600,
    fontFamily: Fonts.bodyRegular,
  },
});