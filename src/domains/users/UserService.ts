import { IUserService } from './interfaces/IUserService';
import { User } from './entities/User';

export class UserService implements IUserService {
  getUserDetails(userId: string): Promise<User> {
    console.log(`Getting user details for user with id: ${userId}`);
    return Promise.resolve(undefined);
  }
}
