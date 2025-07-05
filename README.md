# LivraFast - Application Mobile de Livraison

Une application mobile React Native Expo pour une plateforme de commande et livraison, développée avec une interface moderne et intuitive.

## 🚀 Fonctionnalités

### 👤 Interface Utilisateur
- **Navigation par onglets** : Accueil, Catégories, Recherche, Panier
- **Mode sombre/clair** : Thème adaptatif avec couleurs personnalisées
- **Animations fluides** : Transitions et effets visuels modernes
- **Interface responsive** : Adaptée à tous les écrans

### 🛍️ Fonctionnalités Principales
- **Parcours de produits** : Navigation par catégories avec filtres
- **Recherche avancée** : Suggestions, filtres et résultats en temps réel
- **Panier intelligent** : Gestion des quantités et calcul automatique
- **Commande sans compte** : Possibilité de commander sans inscription
- **Suivi de commande** : Statuts en temps réel

### 🔐 Authentification
- **Connexion/Inscription** : Interface utilisateur complète
- **Gestion de session** : Persistance avec AsyncStorage
- **Profil utilisateur** : Informations personnelles et historique

### 👨‍💼 Interface Admin
- **Dashboard** : Statistiques et aperçu des activités
- **Gestion des produits** : CRUD complet avec images
- **Gestion des commandes** : Suivi et mise à jour des statuts
- **Gestion des utilisateurs** : Administration des comptes
- **Sécurité** : Accès restreint aux administrateurs

## 🛠️ Technologies Utilisées

- **React Native** : Framework mobile cross-platform
- **Expo** : Outils de développement et déploiement
- **React Navigation** : Navigation entre écrans
- **React Native Paper** : Composants UI Material Design
- **AsyncStorage** : Stockage local des données
- **TypeScript** : Typage statique pour la robustesse

## 📱 Écrans Disponibles

### Interface Utilisateur
- `/(tabs)/index` - Accueil avec catégories et produits vedettes
- `/(tabs)/categories` - Navigation par catégories avec filtres
- `/(tabs)/search` - Recherche avec suggestions et résultats
- `/(tabs)/cart` - Panier avec gestion des quantités
- `/product/[id]` - Détail produit avec options et ajout au panier
- `/checkout` - Formulaire de commande en 3 étapes
- `/order-confirmation` - Confirmation avec détails de commande
- `/profile` - Profil utilisateur et paramètres
- `/auth` - Connexion et inscription

### Interface Admin
- `/admin/login` - Connexion administrateur
- `/admin/dashboard` - Tableau de bord avec statistiques
- `/admin/products` - Gestion des produits
- `/admin/orders` - Gestion des commandes
- `/admin/users` - Gestion des utilisateurs

## 🎨 Design System

### Couleurs
- **Primaire** : #007AFF (Bleu iOS)
- **Secondaire** : #FF6B35 (Orange)
- **Tertiaire** : #4CAF50 (Vert succès)
- **Erreur** : #E74C3C (Rouge)
- **Avertissement** : #FF9800 (Orange)

### Thèmes
- **Mode clair** : Fond blanc avec texte sombre
- **Mode sombre** : Fond sombre avec texte clair
- **Adaptatif** : Changement automatique selon les préférences système

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn
- Expo CLI
- Expo Go (application mobile)

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd LivraFast
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application**
```bash
npm start
```

4. **Tester sur mobile**
- Scanner le QR code avec Expo Go (Android)
- Utiliser l'appareil photo (iOS)

### Scripts Disponibles

- `npm start` - Démarrer le serveur de développement
- `npm run android` - Ouvrir sur émulateur Android
- `npm run ios` - Ouvrir sur simulateur iOS
- `npm run web` - Ouvrir dans le navigateur

## 📁 Structure du Projet

```
LivraFast/
├── app/                    # Écrans de l'application
│   ├── (tabs)/           # Navigation par onglets
│   ├── admin/            # Interface administrateur
│   └── _layout.tsx       # Layout principal
├── components/            # Composants réutilisables
│   ├── ui/              # Composants UI de base
│   └── AnimatedCard.tsx # Composants animés
├── contexts/             # Contextes React
│   └── AuthContext.tsx  # Gestion de l'authentification
├── hooks/               # Hooks personnalisés
├── theme/               # Système de thème
│   └── theme.ts        # Couleurs et styles
├── constants/           # Constantes de l'application
└── assets/             # Images et ressources
```

## 🔧 Configuration

### Variables d'Environnement
Créer un fichier `.env` à la racine :
```env
EXPO_PUBLIC_API_URL=http://localhost:8080
EXPO_PUBLIC_APP_NAME=LivraFast
```

### Configuration Expo
Le fichier `app.json` contient la configuration Expo :
- Nom de l'application
- Version et build
- Permissions requises
- Configuration des icônes

## 🧪 Données de Test

L'application utilise des données mockées pour la démonstration :

### Comptes de Test
- **Utilisateur** : `user@test.com` / `password123`
- **Admin** : `admin@livrafast.com` / `admin123`

### Données Mockées
- Produits avec images et descriptions
- Catégories avec icônes
- Commandes avec statuts
- Utilisateurs avec profils

## 🔄 Intégration Backend

L'application est prête pour l'intégration avec un backend :

### Points d'Intégration
- **API REST** : Endpoints pour CRUD
- **WebSocket** : Notifications en temps réel
- **Upload** : Gestion des images produits
- **Paiement** : Intégration Stripe/PayPal

### Endpoints Attendus
```
GET    /api/products
POST   /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status
POST   /api/auth/login
POST   /api/auth/register
```

## 🚀 Déploiement

### Build de Production
```bash
# Android
expo build:android

# iOS
expo build:ios

# Web
expo build:web
```

### Publication
```bash
expo publish
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation technique

---

**LivraFast** - Livraison rapide à domicile 🚚













Bien maintenant prépare le projet complet de sorte a ce qu'il soit prêt à recevoir les APi's stp.
Et aussi 