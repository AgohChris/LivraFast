import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au démarrage
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulation d'une API de connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data pour les utilisateurs
      const mockUsers = [
        {
          id: '1',
          name: 'Jean Dupont',
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean@example.com',
          phone: '06 12 34 56 78',
          avatar: 'https://via.placeholder.com/100',
          address: '123 Rue de la Paix',
          city: 'Abidjan',
          postalCode: '22501',
          country: 'Côte d\'Ivoire',
        },
        {
          id: '2',
          name: 'Marie Martin',
          firstName: 'Marie',
          lastName: 'Martin',
          email: 'marie@example.com',
          phone: '06 98 76 54 32',
          avatar: 'https://via.placeholder.com/100',
          address: '456 Avenue des Cocotiers',
          city: 'Yamoussoukro',
          postalCode: '22502',
          country: 'Côte d\'Ivoire',
        },
        {
          id: '3',
          name: 'Admin LivraFast',
          firstName: 'Admin',
          lastName: 'LivraFast',
          email: 'admin@livrafast.com',
          phone: '06 00 00 00 00',
          avatar: 'https://via.placeholder.com/100',
          address: '789 Boulevard de l\'Administration',
          city: 'Abidjan',
          postalCode: '22500',
          country: 'Côte d\'Ivoire',
        },
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        await AsyncStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulation d'une API d'inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        firstName: userData.name.split(' ')[0],
        lastName: userData.name.split(' ').slice(1).join(' '),
        email: userData.email,
        phone: userData.phone,
        avatar: 'https://via.placeholder.com/100',
      };
      
      setUser(newUser);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 