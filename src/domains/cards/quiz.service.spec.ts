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
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
        save: jest.fn(),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockCardRepository as any,
        mockCardRepository as any,
      );
      await service.answerCard('123', false);
      expect(card.category).toBe(Category.FIRST);
    });

    it('should move a card to the next category on right answer', async () => {
      // do it for every category
      const card = new Card();
      card.category = Category.FIRST;
      const mockCardRepository = {
        findCardById: jest.fn().mockResolvedValue(card),
        save: jest.fn(),
      };
      service = new QuizService(
        mockCardRepository as any,
        mockCardRepository as any,
        mockCardRepository as any,
      );
      await service.answerCard('123', true);
      expect(card.category).toBe(Category.SECOND);
      await service.answerCard('123', true);
      expect(card.category).toBe(Category.THIRD);
      await service.answerCard('123', true);
      expect(card.category).toBe(Category.FOURTH);
      await service.answerCard('123', true);
      expect(card.category).toBe(Category.FIFTH);
      await service.answerCard('123', true);
      expect(card.category).toBe(Category.SIXTH);
      await service.answerCard('123', true);
      expect(card.category).toBe(Category.SEVENTH);
      await service.answerCard('123', true);
      expect(card.category).toBe(Category.DONE);
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
        BadRequestException,
      );
    });
  });
});
