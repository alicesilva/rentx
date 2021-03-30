import { Category } from "../entities/Category";

// DTO => Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
