import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

@injectable()
class ListCategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private listCategoryRepository: CategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.listCategoryRepository.list();
    return categories;
  }
}

export { ListCategoriesService };
