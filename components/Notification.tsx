import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Notification({ 
  message, 
  type, 
  visible, 
  onClose, 
  duration = 3000 
}: NotificationProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'alert';
      case 'info':
        return 'information';
      default:
        return 'information';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      case 'info':
        return '#2196F3';
      default:
        return theme.colors.primary;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#E8F5E8';
      case 'error':
        return '#FFEBEE';
      case 'warning':
        return '#FFF3E0';
      case 'info':
        return '#E3F2FD';
      default:
        return theme.colors.surface;
    }
  };

  useEffect(() => {
    if (visible) {
      // Animation d'entrée
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-fermeture
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: getBackgroundColor(),
        },
      ]}
    >
      <IconButton
        icon={getIcon()}
        size={24}
        iconColor={getColor()}
        style={styles.icon}
      />
      <Text style={[styles.message, { color: theme.colors.onSurface }]}>
        {message}
      </Text>
      <IconButton
        icon="close"
        size={20}
        onPress={handleClose}
        style={styles.closeButton}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  icon: {
    margin: 0,
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    margin: 0,
  },
}); 