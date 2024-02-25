import { INotificationService } from './interfaces/INotificationService';

export class NotificationService implements INotificationService {
  async sendNotification(to: string, message: string): Promise<void> {
    console.log(`Sending notification to ${to} with message: ${message}`);
  }
}
