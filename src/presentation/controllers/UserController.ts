import { Request, Response } from 'express';
import { IUserService } from '../../domains/users/interfaces/IUserService';

export class UserController {
  constructor(private userService: IUserService) {}

  async getUserDetails(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const userDetails = await this.userService.getUserDetails(userId);
      res.json(userDetails);
    } catch (error) {
      // Handle error
      res.status(500).send(error.message);
    }
  }

  // Other controller methods here
}
