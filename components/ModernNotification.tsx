import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { shadows } from '@/theme/theme';

const { width } = Dimensions.get('window');

interface ModernNotificationProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

export default function ModernNotification({
  visible,
  title,
  message,
  type = 'info',
  duration = 4000,
  onClose,
}: ModernNotificationProps) {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const getNotificationColors = () => {
    switch (type) {
      case 'success':
        return {
          gradient: ['#10B981', '#059669'],
          icon: 'check-circle',
        };
      case 'error':
        return {
          gradient: ['#EF4444', '#DC2626'],
          icon: 'close-circle',
        };
      case 'warning':
        return {
          gradient: ['#F59E0B', '#D97706'],
          icon: 'alert-circle',
        };
      case 'info':
      default:
        return {
          gradient: ['#3B82F6', '#2563EB'],
          icon: 'information',
        };
    }
  };

  const colors = getNotificationColors();

  useEffect(() => {
    if (visible) {
      // Animation d'entrée
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-fermeture
      const timer = setTimeout(() => {
        hideNotification();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideNotification = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <LinearGradient
        colors={colors.gradient as [string, string]}
        style={styles.notification}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <IconButton
              icon={colors.icon}
              size={24}
              iconColor="white"
              style={styles.icon}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
          <IconButton
            icon="close"
            size={20}
            iconColor="white"
            onPress={hideNotification}
            style={styles.closeButton}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  notification: {
    borderRadius: 16,
    padding: 16,
    ...shadows.large,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    margin: 0,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
  closeButton: {
    margin: 0,
    marginLeft: 8,
  },
}); 