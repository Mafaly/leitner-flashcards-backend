export class Flashcard {
  id: string;
  question: string;
  answer: string;
  categoryId: string;

  constructor(
    id: string,
    question: string,
    answer: string,
    categoryId: string,
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.categoryId = categoryId;
  }
}
