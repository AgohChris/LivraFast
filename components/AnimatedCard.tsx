import React, { useState } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  disabled?: boolean;
}

export default function AnimatedCard({ children, onPress, style, disabled = false }: AnimatedCardProps) {
  const [scaleValue] = useState(new Animated.Value(1));
  const theme = useTheme();

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
        <Card 
          style={[
            styles.card, 
            { backgroundColor: theme.colors.surface },
            style
          ]}
        >
          {children}
        </Card>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 3,
    marginBottom: 10,
  },
}); 