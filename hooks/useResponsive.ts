import { useWindowDimensions } from 'react-native';
import {
  getScreenType,
  getResponsiveConfig,
  getAdaptiveSize,
  getAdaptiveMargin,
  getAdaptivePadding,
  getAdaptiveFontSize,
  isTablet,
  isPhone,
  getMaxContentWidth,
  getCenteredContentStyle,
  responsiveDimensions,
  BREAKPOINTS,
} from '@/constants/responsive';

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  
  return {
    // Dimensions de l'écran
    screenWidth: width,
    screenHeight: height,
    isLandscape: width > height,
    isPortrait: width < height,
    
    // Types d'écran
    screenType: getScreenType(),
    isTablet: isTablet(),
    isPhone: isPhone(),
    
    // Configuration responsive
    config: getResponsiveConfig(),
    
    // Fonctions utilitaires
    getAdaptiveSize,
    getAdaptiveMargin,
    getAdaptivePadding,
    getAdaptiveFontSize,
    getMaxContentWidth,
    getCenteredContentStyle,
    
    // Breakpoints
    breakpoints: BREAKPOINTS,
    
    // Dimensions responsives
    dimensions: responsiveDimensions,
    
    // Fonctions de style rapides
    getSpacing: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl') => 
      responsiveDimensions.spacing[size],
    
    getMargin: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl') => 
      responsiveDimensions.margin[size],
    
    getPadding: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl') => 
      responsiveDimensions.padding[size],
    
    getFontSize: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'display') => 
      responsiveDimensions.fontSize[size],
    
    getBorderRadius: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl') => 
      responsiveDimensions.borderRadius[size],
    
    getHeight: (type: 'button' | 'input' | 'card' | 'header' | 'tabBar') => 
      responsiveDimensions.height[type],
  };
}; 