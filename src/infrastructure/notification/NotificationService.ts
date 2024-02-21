import { INotificationService } from './interfaces/INotificationService';

export class NotificationService implements INotificationService {
  async sendNotification(to: string, message: string): Promise<void> {
    // Logic to send a notification
  }
}
