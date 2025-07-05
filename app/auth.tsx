import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    setError('');

    const success = await login(email, password);
    
    if (success) {
      router.replace('/(tabs)');
    } else {
      setError('Identifiants incorrects');
    }
    
    setIsLoading(false);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);
    setError('');

    const success = await register({
      name,
      email,
      password,
      phone,
    });
    
    if (success) {
      router.replace('/(tabs)');
    } else {
      setError('Erreur l\'inscription');
    }
    
    setIsLoading(false);
  };

  const renderLoginForm = () => (
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
        style={styles.submitButton}
      >
        Se connecter
      </Button>

      <Button
        mode="text"
        onPress={() => setActiveTab('register')}
        style={styles.switchButton}
      >
        Pas encore de compte ? S'inscrire
      </Button>
    </View>
  );

  const renderRegisterForm = () => (
    <View style={styles.form}>
      <TextInput
        label="Nom complet"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
      />

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
        label="Téléphone (optionnel)"
        value={phone}
        onChangeText={setPhone}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
        left={<TextInput.Icon icon="phone" />}
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

      <TextInput
        label="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry={!showConfirmPassword}
        left={<TextInput.Icon icon="lock-check" />}
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? "eye-off" : "eye"}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
        onPress={handleRegister}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
      >
        S'inscrire
      </Button>

      <Button
        mode="text"
        onPress={() => setActiveTab('login')}
        style={styles.switchButton}
      >
        Déjà un compte ? Se connecter
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            LivraFast
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Livraison rapide à domicile
          </Text>
        </View>

        {/* Onglets */}
        <SegmentedButtons
          value={activeTab}
          onValueChange={setActiveTab}
          buttons={[
            { value: 'login', label: 'Connexion' },
            { value: 'register', label: 'Inscription' },
          ]}
          style={styles.segmentedButtons}
        />

        {/* Formulaire */}
        <Card style={styles.authCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.formTitle}>
              {activeTab === 'login' ? 'Connexion' : 'Inscription'}
            </Text>
            <Text variant="bodyMedium" style={styles.formSubtitle}>
              {activeTab === 'login' 
                ? 'Connectez-vous à votre compte' 
                : 'Créez votre compte pour commencer'
              }
            </Text>

            {activeTab === 'login' ? renderLoginForm() : renderRegisterForm()}
          </Card.Content>
        </Card>

        {/* Informations de test */}
        <View style={styles.testInfo}>
          <Text variant="bodySmall" style={styles.testTitle}>
            🔑 Identifiants de test :
          </Text>
          <Text variant="bodySmall" style={styles.testCredentials}>
            Email: jean@example.com{'\n'}
            Mot de passe: password123
          </Text>
        </View>

        {/* Continuer sans compte */}
        <Button
          mode="text"
          onPress={() => router.replace('/(tabs)')}
          style={styles.continueButton}
        >
          Continuer sans compte
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
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
  segmentedButtons: {
    marginBottom: 20,
  },
  authCard: {
    elevation: 4,
  },
  formTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  formSubtitle: {
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
  submitButton: {
    marginTop: 10,
    paddingVertical: 8,
  },
  switchButton: {
    marginTop: 15,
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
  continueButton: {
    marginTop: 20,
  },
}); 