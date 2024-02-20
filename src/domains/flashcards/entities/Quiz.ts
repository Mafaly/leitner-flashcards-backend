export class Quiz {
  id: string;
  name: string;
  questions: string[];

  constructor(id: string, name: string, questions: string[]) {
    this.id = id;
    this.name = name;
    this.questions = questions;
  }
}
