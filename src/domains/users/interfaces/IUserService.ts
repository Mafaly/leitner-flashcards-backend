import { User } from '../entities/User';

export interface IUserService {
  getUserDetails(userId: string): Promise<User>;
}
