import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  maxWidth?: number;
  centerContent?: boolean;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  style,
  padding = 'lg',
  margin = 'md',
  maxWidth,
  centerContent = false,
}) => {
  const responsive = useResponsive();
  
  const containerStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: responsive.getPadding(padding),
    marginHorizontal: responsive.getMargin(margin),
    ...(centerContent && responsive.isTablet && {
      alignSelf: 'center',
      maxWidth: maxWidth || responsive.getMaxContentWidth(),
    }),
    ...style,
  };

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
};

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: number;
  spacing?: number;
  style?: ViewStyle;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns,
  spacing,
  style,
}) => {
  const responsive = useResponsive();
  
  const gridColumns = columns || responsive.config.columns;
  const gridSpacing = spacing || responsive.config.gridSpacing;
  
  const gridStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gridSpacing,
    ...style,
  };

  return (
    <View style={gridStyle}>
      {React.Children.map(children, (child, index) => (
        <View
          key={index}
          style={{
            width: `${100 / gridColumns}%`,
            paddingHorizontal: gridSpacing / 2,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

interface ResponsiveCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  style,
  padding = 'md',
}) => {
  const responsive = useResponsive();
  
  const cardStyle: ViewStyle = {
    backgroundColor: 'white',
    borderRadius: responsive.getBorderRadius('lg'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: responsive.getPadding(padding),
    marginBottom: responsive.getSpacing('md'),
    ...style,
  };

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

interface ResponsiveButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  mode?: 'contained' | 'outlined' | 'text';
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  children,
  onPress,
  mode = 'contained',
  style,
  disabled = false,
  loading = false,
  icon,
}) => {
  const responsive = useResponsive();
  
  const buttonStyle: ViewStyle = {
    height: responsive.getHeight('button'),
    borderRadius: responsive.getBorderRadius('md'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: responsive.getSpacing('sm'),
    ...style,
  };

  return (
    <View style={buttonStyle}>
      {children}
    </View>
  );
};

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'display';
  style?: any;
  color?: string;
  weight?: 'normal' | 'bold' | '600' | '700';
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'md',
  style,
  color,
  weight = 'normal',
}) => {
  const responsive = useResponsive();
  
  const textStyle = {
    fontSize: responsive.getFontSize(variant),
    fontWeight: weight,
    color,
    ...style,
  };

  return (
    <View style={textStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 