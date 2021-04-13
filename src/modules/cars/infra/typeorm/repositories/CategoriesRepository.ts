import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepoitory";
import { Category } from "../entities/Category";

// Singleton
class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  /* public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  } */

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    /* const category: Category = new Category();
    category.name = name;
    category.description = description;
    category.created_at = new Date(); */

    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      name,
    });

    return category;
  }
}

export { CategoriesRepository };
