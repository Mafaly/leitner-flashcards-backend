import { Category } from '../entities/Category';

export interface ICategoryService {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(categoryId: string): Promise<Category>;
  createCategory(category: Category): Promise<Category>;
  updateCategory(categoryId: string, category: Category): Promise<Category>;
  deleteCategory(categoryId: string): Promise<void>;
}
