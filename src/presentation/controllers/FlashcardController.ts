import { Request, Response } from 'express';
import { IFlashcardService } from '../../domains/flashcards/interfaces/IFlashcardService';

export class FlashcardController {
  constructor(private flashcardService: IFlashcardService) {}

  async getFlashcards(req: Request, res: Response): Promise<void> {
    try {
      const flashcards = await this.flashcardService.getFlashcards();
      res.json(flashcards);
    } catch (error) {
      // Handle error
      res.status(500).send(error.message);
    }
  }

  // Other controller methods here
}
