import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { IconButton, Menu, Avatar, Divider } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';

function TabBarIcon(props: {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}) {
  return <MaterialCommunityIcons size={28} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const handleLogout = () => {
    logout();
    hideMenu();
  };

  const handleProfile = () => {
    router.push('/(tabs)/profile' as any);
    hideMenu();
  };

  const handleAuth = () => {
    router.push('/auth' as any);
    hideMenu();
  };



  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        headerShown: true,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Menu
              visible={menuVisible}
              onDismiss={hideMenu}
              anchor={
                <IconButton
                  icon={user ? "account-circle" : "account"}
                  onPress={showMenu}
                  iconColor={theme.colors.onSurface}
                />
              }
            >
              {user ? (
                <>
                  <Menu.Item
                    onPress={handleProfile}
                    title="Mon profil"
                    leadingIcon="account"
                  />
                  <Menu.Item
                    onPress={() => {
                      console.log('Mes commandes');
                      hideMenu();
                    }}
                    title="Mes commandes"
                    leadingIcon="package-variant"
                  />

                  <Divider />
                  <Menu.Item
                    onPress={handleLogout}
                    title="Se déconnecter"
                    leadingIcon="logout"
                  />
                </>
              ) : (
                <Menu.Item
                  onPress={handleAuth}
                  title="Se connecter"
                  leadingIcon="login"
                />
              )}
            </Menu>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorer',
          tabBarIcon: ({ color }) => <TabBarIcon name="compass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Catégories',
          tabBarIcon: ({ color }) => <TabBarIcon name="view-grid" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color }) => <TabBarIcon name="magnify" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Panier',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <TabBarIcon name="account" color={color} />,
          href: null, // Cache cet onglet de la navigation
        }}
      />
    </Tabs>
  );
}
