export enum Category {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH',
  FIFTH = 'FIFTH',
  SIXTH = 'SIXTH',
  SEVENTH = 'SEVENTH',
  DONE = 'DONE',
}

export const categoryDaysMap = {
  [Category.FIRST]: 0, // Pas de délai pour la première révision
  [Category.SECOND]: 2,
  [Category.THIRD]: 4,
  [Category.FOURTH]: 8,
  [Category.FIFTH]: 16,
  [Category.SIXTH]: 32,
  [Category.SEVENTH]: 64,
};
