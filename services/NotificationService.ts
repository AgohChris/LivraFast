import { Platform } from 'react-native';

// Service de notifications simplifié pour le développement
export class NotificationService {
  static async registerForPushNotificationsAsync() {
    // En développement, on simule juste l'enregistrement
    if (__DEV__) {
      console.log('Notifications simulées en mode développement');
      return 'dev-token';
    }

    // En production, on utiliserait expo-notifications
    console.log('Notifications push nécessitent un appareil physique en production');
    return null;
  }

  static async scheduleLocalNotification(title: string, body: string, data?: any) {
    // En développement, on affiche juste dans la console
    if (__DEV__) {
      console.log('📱 Notification:', title, body, data);
      return;
    }

    // En production, on utiliserait expo-notifications
    console.log('Notification programmée:', title, body);
  }

  static async sendOrderConfirmation(orderId: string, estimatedDelivery: string) {
    await this.scheduleLocalNotification(
      'Commande confirmée !',
      `Votre commande #${orderId} a été confirmée. Livraison estimée: ${estimatedDelivery}`,
      { type: 'order_confirmation', orderId }
    );
  }

  static async sendOrderStatusUpdate(orderId: string, status: string) {
    await this.scheduleLocalNotification(
      'Mise à jour de commande',
      `Votre commande #${orderId} est maintenant ${status}`,
      { type: 'order_status', orderId, status }
    );
  }

  static async sendDeliveryNotification(orderId: string) {
    await this.scheduleLocalNotification(
      'Livraison en cours !',
      `Votre commande #${orderId} est en route vers vous`,
      { type: 'delivery', orderId }
    );
  }

  static async sendPromotionalNotification(title: string, message: string) {
    await this.scheduleLocalNotification(
      title,
      message,
      { type: 'promotional' }
    );
  }

  static async sendPriceDropNotification(productName: string, newPrice: string) {
    await this.scheduleLocalNotification(
      'Prix réduit !',
      `${productName} est maintenant à ${newPrice}`,
      { type: 'price_drop', productName, newPrice }
    );
  }

  static async sendBackInStockNotification(productName: string) {
    await this.scheduleLocalNotification(
      'Produit de retour !',
      `${productName} est de nouveau en stock`,
      { type: 'back_in_stock', productName }
    );
  }
} 