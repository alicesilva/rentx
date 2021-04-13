import { inject, injectable } from "tsyringe";

import { Category } from "../../infra/typeorm/entities/Category";
import { CategoriesRepository } from "../../infra/typeorm/repositories/CategoriesRepository";

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
