import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

class ListCategoriesService {
  constructor(private listCategoryRepository: CategoriesRepository) {
    // nada
  }

  execute(): Category[] {
    return this.listCategoryRepository.list();
  }
}

export { ListCategoriesService };
