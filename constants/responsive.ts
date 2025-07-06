import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Breakpoints pour différents types d'écrans
export const BREAKPOINTS = {
  // Téléphones petits (iPhone SE, etc.)
  phoneSmall: 375,
  // Téléphones moyens (iPhone standard)
  phoneMedium: 414,
  // Téléphones grands (iPhone Plus, etc.)
  phoneLarge: 428,
  // Tablettes petites (iPad mini)
  tabletSmall: 768,
  // Tablettes moyennes (iPad standard)
  tabletMedium: 834,
  // Tablettes grandes (iPad Pro)
  tabletLarge: 1024,
};

// Fonction pour déterminer le type d'écran
export const getScreenType = () => {
  const screenWidth = SCREEN_WIDTH;
  
  if (screenWidth < BREAKPOINTS.phoneSmall) return 'phoneSmall';
  if (screenWidth < BREAKPOINTS.phoneMedium) return 'phoneMedium';
  if (screenWidth < BREAKPOINTS.phoneLarge) return 'phoneLarge';
  if (screenWidth < BREAKPOINTS.tabletSmall) return 'tabletSmall';
  if (screenWidth < BREAKPOINTS.tabletMedium) return 'tabletMedium';
  return 'tabletLarge';
};

// Fonction pour normaliser les tailles selon la densité de pixels
export const normalize = (size: number) => {
  const scale = SCREEN_WIDTH / 375; // Base sur iPhone SE
  const newSize = size * scale;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Dimensions responsives
export const responsiveDimensions = {
  // Marges et paddings
  margin: {
    xs: normalize(4),
    sm: normalize(8),
    md: normalize(16),
    lg: normalize(24),
    xl: normalize(32),
    xxl: normalize(48),
  },
  
  padding: {
    xs: normalize(4),
    sm: normalize(8),
    md: normalize(16),
    lg: normalize(24),
    xl: normalize(32),
    xxl: normalize(48),
  },
  
  // Tailles de police
  fontSize: {
    xs: normalize(10),
    sm: normalize(12),
    md: normalize(14),
    lg: normalize(16),
    xl: normalize(18),
    xxl: normalize(20),
    xxxl: normalize(24),
    display: normalize(28),
  },
  
  // Hauteurs de composants
  height: {
    button: normalize(48),
    input: normalize(56),
    card: normalize(120),
    header: normalize(60),
    tabBar: normalize(80),
  },
  
  // Rayons de bordure
  borderRadius: {
    xs: normalize(4),
    sm: normalize(8),
    md: normalize(12),
    lg: normalize(16),
    xl: normalize(20),
    xxl: normalize(24),
  },
  
  // Espacements
  spacing: {
    xs: normalize(4),
    sm: normalize(8),
    md: normalize(16),
    lg: normalize(24),
    xl: normalize(32),
    xxl: normalize(48),
  },
};

// Configuration responsive selon le type d'écran
export const getResponsiveConfig = () => {
  const screenType = getScreenType();
  
  const configs = {
    phoneSmall: {
      columns: 1,
      cardWidth: SCREEN_WIDTH - 32,
      gridSpacing: 16,
      headerPadding: 16,
      contentPadding: 16,
    },
    phoneMedium: {
      columns: 1,
      cardWidth: SCREEN_WIDTH - 32,
      gridSpacing: 16,
      headerPadding: 20,
      contentPadding: 20,
    },
    phoneLarge: {
      columns: 1,
      cardWidth: SCREEN_WIDTH - 32,
      gridSpacing: 20,
      headerPadding: 24,
      contentPadding: 24,
    },
    tabletSmall: {
      columns: 2,
      cardWidth: (SCREEN_WIDTH - 48) / 2,
      gridSpacing: 16,
      headerPadding: 24,
      contentPadding: 24,
    },
    tabletMedium: {
      columns: 2,
      cardWidth: (SCREEN_WIDTH - 64) / 2,
      gridSpacing: 20,
      headerPadding: 32,
      contentPadding: 32,
    },
    tabletLarge: {
      columns: 3,
      cardWidth: (SCREEN_WIDTH - 80) / 3,
      gridSpacing: 24,
      headerPadding: 40,
      contentPadding: 40,
    },
  };
  
  return configs[screenType] || configs.phoneMedium;
};

// Fonction pour obtenir des dimensions adaptatives
export const getAdaptiveSize = (phoneSize: number, tabletSize: number) => {
  const screenType = getScreenType();
  const isTablet = screenType.includes('tablet');
  return isTablet ? tabletSize : phoneSize;
};

// Fonction pour obtenir des marges adaptatives
export const getAdaptiveMargin = (phoneMargin: number, tabletMargin: number) => {
  const screenType = getScreenType();
  const isTablet = screenType.includes('tablet');
  return isTablet ? tabletMargin : phoneMargin;
};

// Fonction pour obtenir des paddings adaptatifs
export const getAdaptivePadding = (phonePadding: number, tabletPadding: number) => {
  const screenType = getScreenType();
  const isTablet = screenType.includes('tablet');
  return isTablet ? tabletPadding : phonePadding;
};

// Fonction pour obtenir des tailles de police adaptatives
export const getAdaptiveFontSize = (phoneSize: number, tabletSize: number) => {
  const screenType = getScreenType();
  const isTablet = screenType.includes('tablet');
  return normalize(isTablet ? tabletSize : phoneSize);
};

// Dimensions de l'écran
export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
  isPortrait: SCREEN_WIDTH < SCREEN_HEIGHT,
};

// Fonction pour vérifier si c'est un iPad
export const isTablet = () => {
  const screenType = getScreenType();
  return screenType.includes('tablet');
};

// Fonction pour vérifier si c'est un iPhone
export const isPhone = () => {
  const screenType = getScreenType();
  return screenType.includes('phone');
};

// Fonction pour obtenir la largeur maximale du contenu
export const getMaxContentWidth = () => {
  const screenType = getScreenType();
  const isTablet = screenType.includes('tablet');
  
  if (isTablet) {
    return Math.min(SCREEN_WIDTH, 1200); // Limite pour les tablettes
  }
  
  return SCREEN_WIDTH;
};

// Fonction pour centrer le contenu sur les tablettes
export const getCenteredContentStyle = () => {
  const screenType = getScreenType();
  const isTablet = screenType.includes('tablet');
  
  if (isTablet) {
    const maxWidth = getMaxContentWidth();
    const marginHorizontal = (SCREEN_WIDTH - maxWidth) / 2;
    return {
      maxWidth,
      marginHorizontal,
    };
  }
  
  return {};
}; 