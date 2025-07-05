import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, TextInput, Button, Card, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulation d'une connexion admin
    setTimeout(() => {
      if (email === 'admin@livrafast.com' && password === 'admin123') {
        // Connexion réussie
        router.replace('/admin/dashboard');
      } else {
        setError('Identifiants incorrects');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Header */}
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            LivraFast
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Administration
          </Text>
        </View>

        {/* Formulaire de connexion */}
        <Card style={styles.loginCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.loginTitle}>
              Connexion Admin
            </Text>
            <Text variant="bodyMedium" style={styles.loginSubtitle}>
              Accédez au panneau d'administration
            </Text>

            <View style={styles.form}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              {error ? (
                <HelperText type="error" visible={!!error}>
                  {error}
                </HelperText>
              ) : null}

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.loginButton}
              >
                Se connecter
              </Button>
            </View>

            {/* Informations de test */}
            <View style={styles.testInfo}>
              <Text variant="bodySmall" style={styles.testTitle}>
                🔑 Identifiants de test :
              </Text>
              <Text variant="bodySmall" style={styles.testCredentials}>
                Email: admin@livrafast.com{'\n'}
                Mot de passe: admin123
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.footerText}>
            Accès réservé aux administrateurs
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    color: '#7f8c8d',
  },
  loginCard: {
    elevation: 4,
  },
  loginTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  loginSubtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 30,
  },
  form: {
    gap: 15,
  },
  input: {
    marginBottom: 5,
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 8,
  },
  testInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  testTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007bff',
  },
  testCredentials: {
    color: '#6c757d',
    fontFamily: 'monospace',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#7f8c8d',
    textAlign: 'center',
  },
}); 