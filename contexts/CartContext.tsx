import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModernNotification from '@/components/ModernNotification';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  storage?: string;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  showNotification: (title: string, message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    visible: false,
    title: '',
    message: '',
    type: 'info',
  });

  // Charger le panier depuis AsyncStorage au démarrage
  useEffect(() => {
    loadCart();
  }, []);

  // Sauvegarder le panier dans AsyncStorage à chaque modification
  useEffect(() => {
    saveCart();
  }, [items]);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  };

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Mettre à jour la quantité si l'article existe déjà
        const updatedItems = prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
        
        showNotification(
          'Article mis à jour ! 🛒',
          `${newItem.name} - Quantité: ${existingItem.quantity + newItem.quantity}`,
          'success'
        );
        
        return updatedItems;
      } else {
        // Ajouter un nouvel article
        showNotification(
          'Article ajouté ! ✅',
          `${newItem.name} a été ajouté au panier`,
          'success'
        );
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      
      if (itemToRemove) {
        showNotification(
          'Article supprimé ! 🗑️',
          `${itemToRemove.name} a été retiré du panier`,
          'info'
        );
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      
      const updatedItem = updatedItems.find(item => item.id === itemId);
      if (updatedItem) {
        showNotification(
          'Quantité mise à jour ! 📝',
          `${updatedItem.name} - Nouvelle quantité: ${quantity}`,
          'info'
        );
      }
      
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    showNotification(
      'Panier vidé ! 🧹',
      'Tous les articles ont été supprimés du panier',
      'warning'
    );
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const showNotification = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setNotification({
      visible: true,
      title,
      message,
      type,
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice,
    showNotification,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <ModernNotification
        visible={notification.visible}
        title={notification.title}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
    </CartContext.Provider>
  );
}; 