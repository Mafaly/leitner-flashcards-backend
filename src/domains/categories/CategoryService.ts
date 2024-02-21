import { ICategoryService } from './interfaces/ICategoryService';
import { Category } from './entities/Category';

export class CategoryService implements ICategoryService {
  createCategory(category: Category): Promise<Category> {
    return Promise.resolve(undefined);
  }

  deleteCategory(categoryId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getAllCategories(): Promise<Category[]> {
    return Promise.resolve([]);
  }

  getCategoryById(categoryId: string): Promise<Category> {
    return Promise.resolve(undefined);
  }

  updateCategory(categoryId: string, category: Category): Promise<Category> {
    return Promise.resolve(undefined);
  }
}
