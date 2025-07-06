# Guide du Responsive Design - LivraFast

## Vue d'ensemble

Le système de responsive design de LivraFast est conçu pour s'adapter automatiquement à tous les types d'écrans : téléphones (petits, moyens, grands) et tablettes (petites, moyennes, grandes).

## Architecture

### 1. Constantes Responsives (`constants/responsive.ts`)

Ce fichier contient toutes les constantes et fonctions utilitaires pour le responsive design :

- **Breakpoints** : Définit les seuils pour différents types d'écrans
- **Fonctions de normalisation** : Adapte les tailles selon la densité de pixels
- **Dimensions responsives** : Marges, paddings, tailles de police, etc.
- **Configuration adaptative** : Grilles, colonnes, espacements selon le type d'écran

### 2. Hook Responsive (`hooks/useResponsive.ts`)

Hook personnalisé qui fournit toutes les fonctionnalités responsive :

```typescript
const responsive = useResponsive();

// Propriétés disponibles
responsive.screenWidth          // Largeur de l'écran
responsive.screenHeight         // Hauteur de l'écran
responsive.isLandscape          // Mode paysage
responsive.isPortrait           // Mode portrait
responsive.isTablet             // Est-ce une tablette ?
responsive.isPhone              // Est-ce un téléphone ?
responsive.screenType           // Type d'écran (phoneSmall, tabletLarge, etc.)

// Fonctions utilitaires
responsive.getAdaptiveSize(phoneSize, tabletSize)
responsive.getAdaptiveMargin(phoneMargin, tabletMargin)
responsive.getAdaptivePadding(phonePadding, tabletPadding)
responsive.getAdaptiveFontSize(phoneSize, tabletSize)
responsive.getMaxContentWidth()
responsive.getCenteredContentStyle()

// Fonctions de style rapides
responsive.getSpacing('lg')
responsive.getMargin('md')
responsive.getPadding('xl')
responsive.getFontSize('title')
responsive.getBorderRadius('lg')
responsive.getHeight('button')
```

## Utilisation

### 1. Dans un composant

```typescript
import { useResponsive } from '@/hooks/useResponsive';

export default function MonComposant() {
  const responsive = useResponsive();
  
  return (
    <View style={{
      padding: responsive.getPadding('lg'),
      marginHorizontal: responsive.getMargin('md'),
    }}>
      <Text style={{
        fontSize: responsive.getAdaptiveFontSize(16, 20),
        lineHeight: responsive.getAdaptiveSize(24, 28),
      }}>
        Mon texte responsive
      </Text>
    </View>
  );
}
```

### 2. Grilles adaptatives

```typescript
// Grille qui s'adapte automatiquement
<View style={{
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: responsive.getSpacing('md'),
}}>
  {items.map(item => (
    <View style={{
      width: responsive.isTablet 
        ? `${100 / responsive.config.columns}%`
        : '100%',
    }}>
      {item}
    </View>
  ))}
</View>
```

### 3. Composants Responsive

Utilisez les composants prêts à l'emploi :

```typescript
import { ResponsiveLayout, ResponsiveGrid, ResponsiveCard } from '@/components/ResponsiveLayout';

<ResponsiveLayout padding="lg" centerContent>
  <ResponsiveGrid columns={responsive.config.columns}>
    <ResponsiveCard>
      <Text>Contenu de la carte</Text>
    </ResponsiveCard>
  </ResponsiveGrid>
</ResponsiveLayout>
```

## Breakpoints

| Type d'écran | Largeur | Utilisation |
|---------------|---------|-------------|
| phoneSmall | < 375px | iPhone SE, petits téléphones |
| phoneMedium | 375-414px | iPhone standard |
| phoneLarge | 414-428px | iPhone Plus, grands téléphones |
| tabletSmall | 768-834px | iPad mini |
| tabletMedium | 834-1024px | iPad standard |
| tabletLarge | > 1024px | iPad Pro, grandes tablettes |

## Tailles Responsives

### Marges et Paddings

```typescript
// Tailles disponibles
'xs'  // 4px
'sm'  // 8px
'md'  // 16px
'lg'  // 24px
'xl'  // 32px
'xxl' // 48px

// Utilisation
responsive.getPadding('lg')  // 24px
responsive.getMargin('md')   // 16px
```

### Tailles de Police

```typescript
// Tailles disponibles
'xs'      // 10px
'sm'      // 12px
'md'      // 14px
'lg'      // 16px
'xl'      // 18px
'xxl'     // 20px
'xxxl'    // 24px
'display' // 28px

// Utilisation
responsive.getFontSize('lg')  // 16px
```

### Rayons de Bordure

```typescript
// Tailles disponibles
'xs'  // 4px
'sm'  // 8px
'md'  // 12px
'lg'  // 16px
'xl'  // 20px
'xxl' // 24px

// Utilisation
responsive.getBorderRadius('lg')  // 16px
```

## Bonnes Pratiques

### 1. Utilisez les fonctions adaptatives

❌ **Mauvais** :
```typescript
const fontSize = 16;
const padding = 20;
```

✅ **Bon** :
```typescript
const fontSize = responsive.getAdaptiveFontSize(16, 20);
const padding = responsive.getAdaptivePadding(20, 32);
```

### 2. Adaptez les grilles

❌ **Mauvais** :
```typescript
const columns = 2; // Fixe
```

✅ **Bon** :
```typescript
const columns = responsive.config.columns; // Adaptatif
```

### 3. Gérez les espacements

❌ **Mauvais** :
```typescript
marginHorizontal: 20,
```

✅ **Bon** :
```typescript
marginHorizontal: responsive.getMargin('lg'),
```

### 4. Adaptez les tailles d'icônes

❌ **Mauvais** :
```typescript
size={24}
```

✅ **Bon** :
```typescript
size={responsive.getAdaptiveSize(24, 32)}
```

## Exemples d'Implémentation

### Page d'accueil responsive

```typescript
const renderHeader = () => (
  <View style={{
    padding: responsive.getPadding(responsive.isTablet ? 'xl' : 'lg'),
  }}>
    <Text style={{
      fontSize: responsive.getAdaptiveFontSize(28, 32),
      fontWeight: 'bold',
    }}>
      Titre responsive
    </Text>
  </View>
);
```

### Grille de produits

```typescript
const renderProducts = () => {
  const productWidth = responsive.isTablet 
    ? (responsive.screenWidth - responsive.getSpacing('xl') * 2 - responsive.getSpacing('md')) / responsive.config.columns
    : responsive.screenWidth - responsive.getSpacing('lg') * 2;

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: responsive.getSpacing('md'),
    }}>
      {products.map(product => (
        <View style={{ width: productWidth }}>
          {product}
        </View>
      ))}
    </View>
  );
};
```

## Tests Responsive

### 1. Test sur différents appareils

- iPhone SE (375px)
- iPhone 12 (390px)
- iPhone 12 Pro Max (428px)
- iPad mini (768px)
- iPad (834px)
- iPad Pro (1024px)

### 2. Test des orientations

- Portrait et paysage
- Rotation de l'écran
- Changement de taille de fenêtre (web)

### 3. Test des densités de pixels

- Écrans haute densité (2x, 3x)
- Écrans standard (1x)

## Maintenance

### Ajout de nouveaux breakpoints

1. Modifiez `constants/responsive.ts`
2. Ajoutez le nouveau breakpoint dans `BREAKPOINTS`
3. Mettez à jour `getScreenType()`
4. Testez sur l'appareil cible

### Ajout de nouvelles tailles

1. Ajoutez la taille dans `responsiveDimensions`
2. Mettez à jour le hook `useResponsive`
3. Documentez la nouvelle taille

## Conclusion

Le système responsive de LivraFast garantit une expérience utilisateur optimale sur tous les appareils. En suivant ces bonnes pratiques, vous créerez des interfaces qui s'adaptent parfaitement à chaque type d'écran. 