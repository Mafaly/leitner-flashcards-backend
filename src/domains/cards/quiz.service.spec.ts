import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CardRepository } from '../../infrastructure/repositories/CardRepository';
import { Card } from './entities/card.entities';
import { Category } from '../categories/entities/Category';
import { QuizRepository } from '../../infrastructure/repositories/QuizRepository';
import { QuizCardRepository } from '../../infrastructure/repositories/QuizCardRepository';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizService],
    })
      .useMocker((token) => {
        if (
          token === CardRepository ||
          token === QuizRepository ||
          token === QuizCardRepository
        ) {
          return { findCardById: jest.fn().mockResolvedValue(null) };
        }
      })
      .compile();

    service = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('answerCard', () => {
    it('should throw if cardId is empty', () => {
      expect(() => service.answerCard('', true)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should throw if card isn't found", () => {
      // make cardRepository.findCardById return null
      expect(() => service.answerCard('123', true)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should move a card from any category to the first category on wrong answer', async () => {
      const card = new Card();
      card.category = Category.FOURTH;
      card.id = '123';
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
        save: jest.fn(),
      };
      const mockQuizRepository = {
        findActiveQuiz: jest.fn().mockResolvedValue({
          quizCards: [{ card: { id: '123' }, answered: false }],
        }),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockQuizRepository as any,
        mockCardRepository as any,
      );
      await service.answerCard('123', false);
      expect(card.category).toBe(Category.FIRST);
    });

    it('should move a card from FIRST to SECOND category on right answer', async () => {
      // do it for every category
      const card = new Card();
      card.id = '123';
      card.category = Category.FIRST;
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
        save: jest.fn(),
      };
      const mockQuizRepository = {
        findActiveQuiz: jest.fn().mockResolvedValue({
          quizCards: [{ card: { id: '123' }, answered: false }],
        }),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockQuizRepository as any,
        mockCardRepository as any,
      );
      await service.answerCard('123', true);
      expect(card.category).toBe(Category.SECOND);
    });

    it('should throw when trying to answer a question already answered', () => {
      const card = new Card();
      card.id = '123';
      card.category = Category.FIRST;
      card.lastAnswered = new Date();
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
      };
      const mockQuizRepository = {
        findActiveQuiz: jest.fn().mockResolvedValue({
          quizCards: [{ card: { id: '123' }, answered: true }],
        }),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockQuizRepository as any,
        mockQuizRepository as any,
      );
      expect(() => service.answerCard('123', true)).rejects.toThrow(
        'Card is already answered',
      );
    });

    it('should throw when trying to answer a question already DONE', () => {
      const card = new Card();
      card.category = Category.DONE;
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockCardRepository as any,
        mockCardRepository as any,
      );
      expect(() => service.answerCard('123', true)).rejects.toThrow(
        'Card is already done',
      );
    });

    it('should throw when trying to answer a question not in the active quiz', () => {
      const card = new Card();
      card.category = Category.FIRST;
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
      };
      const mockQuizRepository = {
        findActiveQuiz: jest.fn().mockResolvedValue({
          quizCards: [],
        }),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockQuizRepository as any,
        mockCardRepository as any,
      );
      expect(() => service.answerCard('123', true)).rejects.toThrow(
        'Card is not in active quiz',
      );
    });

    it('should should throw if there is no active quiz', () => {
      const card = new Card();
      card.category = Category.FIRST;
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
      };
      const mockQuizRepository = {
        findActiveQuiz: jest.fn().mockResolvedValue(null),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockQuizRepository as any,
        mockCardRepository as any,
      );
      expect(() => service.answerCard('123', true)).rejects.toThrow(
        'No active quiz',
      );
    });

    it('should set the card as answered', async () => {
      const card = new Card();
      card.id = '123';
      card.category = Category.FIRST;
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
        save: jest.fn(),
      };
      const mockQuizRepository = {
        findActiveQuiz: jest.fn().mockResolvedValue({
          quizCards: [{ card: { id: '123' }, answered: false }],
        }),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockQuizRepository as any,
        mockCardRepository as any,
      );
      await service.answerCard('123', true);
      expect(card.lastAnswered).toBeDefined();
    });
  });
});
