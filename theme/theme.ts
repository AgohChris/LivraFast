import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// Palette de couleurs moderne et élégante
const colors = {
  light: {
    // Couleurs principales
    primary: '#6366F1', // Indigo moderne
    primaryContainer: '#EEF2FF',
    secondary: '#F59E0B', // Amber
    secondaryContainer: '#FEF3C7',
    tertiary: '#10B981', // Emerald
    tertiaryContainer: '#D1FAE5',
    
    // Couleurs de surface
    surface: '#FFFFFF',
    surfaceVariant: '#F8FAFC',
    background: '#FFFFFF',
    
    // Couleurs d'état
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    info: '#3B82F6',
    
    // Couleurs de texte
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onSurface: '#1E293B',
    onSurfaceVariant: '#64748B',
    onBackground: '#1E293B',
    onError: '#FFFFFF',
    
    // Couleurs d'interface
    outline: '#E2E8F0',
    outlineVariant: '#F1F5F9',
    shadow: '#000000',
    scrim: '#000000',
    
    // Couleurs inversées
    inverseSurface: '#1E293B',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#C7D2FE',
    
    // Élévation
    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#FFFFFF',
      level3: '#FFFFFF',
      level4: '#FFFFFF',
      level5: '#FFFFFF',
    },
    
    // Gradients
    gradients: {
      primary: ['#6366F1', '#8B5CF6'],
      secondary: ['#F59E0B', '#F97316'],
      success: ['#10B981', '#059669'],
      error: ['#EF4444', '#DC2626'],
      background: ['#FFFFFF', '#F8FAFC'],
      card: ['#FFFFFF', '#F1F5F9'],
    },
  },
  dark: {
    // Couleurs principales
    primary: '#8B5CF6', // Violet plus vif en mode sombre
    primaryContainer: '#1E1B4B',
    secondary: '#FBBF24', // Jaune plus vif
    secondaryContainer: '#451A03',
    tertiary: '#34D399', // Vert plus vif
    tertiaryContainer: '#064E3B',
    
    // Couleurs de surface
    surface: '#1E293B',
    surfaceVariant: '#334155',
    background: '#0F172A',
    
    // Couleurs d'état
    error: '#F87171',
    warning: '#FBBF24',
    success: '#34D399',
    info: '#60A5FA',
    
    // Couleurs de texte
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onSurface: '#F1F5F9',
    onSurfaceVariant: '#CBD5E1',
    onBackground: '#F1F5F9',
    onError: '#FFFFFF',
    
    // Couleurs d'interface
    outline: '#475569',
    outlineVariant: '#334155',
    shadow: '#000000',
    scrim: '#000000',
    
    // Couleurs inversées
    inverseSurface: '#F1F5F9',
    inverseOnSurface: '#1E293B',
    inversePrimary: '#1E1B4B',
    
    // Élévation
    elevation: {
      level0: 'transparent',
      level1: '#1E293B',
      level2: '#1E293B',
      level3: '#1E293B',
      level4: '#1E293B',
      level5: '#1E293B',
    },
    
    // Gradients
    gradients: {
      primary: ['#8B5CF6', '#A855F7'],
      secondary: ['#FBBF24', '#F59E0B'],
      success: ['#34D399', '#10B981'],
      error: ['#F87171', '#EF4444'],
      background: ['#0F172A', '#1E293B'],
      card: ['#1E293B', '#334155'],
    },
  },
};

// Thème clair moderne
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors.light,
  },
  roundness: 16,
  animation: {
    scale: 1.0,
  },
};

// Thème sombre moderne
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...colors.dark,
  },
  roundness: 16,
  animation: {
    scale: 1.0,
  },
};

// Styles communs modernes avec support responsive
export const commonStyles = {
  // Conteneurs
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  
  // Cartes modernes
  card: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  
  // Headers
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 28,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  
  // Barres de recherche
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 24,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
  },
  
  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 16,
    fontSize: 20,
    letterSpacing: -0.3,
  },
  
  // Chips modernes
  chip: {
    marginRight: 12,
    borderRadius: 12,
    elevation: 2,
  },
  
  // Boutons
  button: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 4,
  },
  buttonPrimary: {
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  
  // FAB moderne
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    elevation: 8,
  },
  
  // Animations
  fadeIn: {
    opacity: 0,
    transform: [{ translateY: 20 }],
  },
  fadeInActive: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  
  // Effets de glassmorphism
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  // Gradients
  gradientPrimary: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  
  // Styles responsives
  responsive: {
    // Grilles adaptatives
    grid: {
      phone: {
        columns: 1,
        spacing: 16,
        padding: 16,
      },
      tablet: {
        columns: 2,
        spacing: 20,
        padding: 24,
      },
      tabletLarge: {
        columns: 3,
        spacing: 24,
        padding: 32,
      },
    },
    
    // Headers adaptatifs
    header: {
      phone: {
        padding: 16,
        fontSize: 24,
      },
      tablet: {
        padding: 24,
        fontSize: 28,
      },
      tabletLarge: {
        padding: 32,
        fontSize: 32,
      },
    },
    
    // Cartes adaptatives
    card: {
      phone: {
        marginHorizontal: 16,
        borderRadius: 16,
      },
      tablet: {
        marginHorizontal: 20,
        borderRadius: 20,
      },
      tabletLarge: {
        marginHorizontal: 24,
        borderRadius: 24,
      },
    },
    
    // Boutons adaptatifs
    button: {
      phone: {
        height: 48,
        fontSize: 16,
        borderRadius: 12,
      },
      tablet: {
        height: 56,
        fontSize: 18,
        borderRadius: 16,
      },
      tabletLarge: {
        height: 64,
        fontSize: 20,
        borderRadius: 20,
      },
    },
  },
};

// Fonction pour obtenir le thème selon le mode
export const getTheme = (isDark: boolean) => {
  return isDark ? darkTheme : lightTheme;
};

// Couleurs d'accent pour les statuts
export const statusColors = {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  neutral: '#6B7280',
};

// Couleurs pour les catégories avec gradients
export const categoryColors = {
  'Vêtements Homme': { primary: '#6366F1', secondary: '#8B5CF6' },
  'Vêtements Femme': { primary: '#EC4899', secondary: '#F472B6' },
  'Vêtements Enfant': { primary: '#10B981', secondary: '#34D399' },
  'Pantalons Homme': { primary: '#F59E0B', secondary: '#FBBF24' },
  'Pantalons Femme': { primary: '#8B5CF6', secondary: '#A855F7' },
  'Pantalons Enfant': { primary: '#EC4899', secondary: '#F472B6' },
  'Chaussures Homme': { primary: '#3B82F6', secondary: '#60A5FA' },
  'Chaussures Femme': { primary: '#059669', secondary: '#10B981' },
  'Chaussures Enfant': { primary: '#F59E0B', secondary: '#FBBF24' },
  'Habits Homme': { primary: '#6366F1', secondary: '#8B5CF6' },
  'Habits Femme': { primary: '#EC4899', secondary: '#F472B6' },
  'Habits Enfant': { primary: '#10B981', secondary: '#34D399' },
};

// Effets de shadow modernes
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
}; 