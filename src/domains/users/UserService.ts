import { IUserService } from './interfaces/IUserService';
import { User } from './entities/User';

export class UserService implements IUserService {
  getUserDetails(userId: string): Promise<User> {
    return Promise.resolve(undefined);
  }
}
