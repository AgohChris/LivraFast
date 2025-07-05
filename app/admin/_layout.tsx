import { Stack } from 'expo-router';
import React from 'react';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: 'Connexion Admin',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Dashboard Admin',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          title: 'Gestion Produits',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: 'Gestion Commandes',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          title: 'Gestion Utilisateurs',
          headerShown: true,
        }}
      />
    </Stack>
  );
} 