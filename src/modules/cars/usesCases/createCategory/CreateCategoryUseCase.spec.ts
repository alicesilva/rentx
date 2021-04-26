/* describe("Criar categoria", () => {
  it("Espero que 2 + 2 seja 4", () => {
    const soma = 2 + 2;
    const resultado = 4;

    expect(soma).toBe(resultado);
  });

  it("Espero que 2 + 2 nao seja 5", () => {
    const soma = 2 + 2;
    const resultado = 5;

    expect(soma).not.toBe(resultado);
  });
}); */

import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";

let createCategoryService: CreateCategoryService;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoriesRepositoryInMemory
    );
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category teste",
      description: "Category description teste",
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should be able to create a new category with name exists", async () => {
    const category = {
      name: "Category teste",
      description: "Category description teste",
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryService.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
